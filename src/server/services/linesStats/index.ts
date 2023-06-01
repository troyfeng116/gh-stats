import { CHUNK_SIZE } from '@/server/constants'
import { GH_API_Call__getAllContributorActivity } from '@/server/lib/gh-api/metrics'
import { aggregateWeeklyContributorActivity } from '@/server/utils/aggregateWeeklyActivity'
import {
    SHARED_APIFields__GetContributorCommitActivity,
    SHARED_Data__ContributorCommitActivity,
    SHARED_Model__LinesStats,
    SHARED_Model__RepoWithCountCommits,
} from '@/shared/models'

export const getContributorActivity = async (
    accessToken: string,
    authUser: string,
    owner: string,
    repo: string,
): Promise<SHARED_APIFields__GetContributorCommitActivity> => {
    const { success, error, allActivity } = await GH_API_Call__getAllContributorActivity(accessToken, owner, repo)
    console.log(`[services/lineStats] getContributorActivity ${owner}/${repo} has ${allActivity?.length} contributors`)

    if (!success || allActivity === undefined) {
        return { activity: undefined, success: false, error: error }
    }

    for (let i = 0; i < allActivity.length; i++) {
        const {
            author: { login },
        } = allActivity[i]
        if (login === authUser) {
            return { activity: allActivity[i] as SHARED_Data__ContributorCommitActivity, success: true }
        }
    }

    return {
        activity: undefined,
        success: false,
        error: `[services/lineStats] getContributorActivity user ${authUser} didn't contribute to repo ${owner}/${repo}`,
    }
}

/* ======== compute aggregate stats ======== */

export const computeLinesStatsAcrossReposUsingMetrics = async (
    accessToken: string,
    authUser: string,
    repos: SHARED_Model__RepoWithCountCommits[],
): Promise<SHARED_Model__LinesStats> => {
    try {
        const activities: SHARED_APIFields__GetContributorCommitActivity[] = []
        let idx = 0
        while (idx < repos.length) {
            const activityPromiseChunk: Promise<SHARED_APIFields__GetContributorCommitActivity>[] = []
            const startIdx = idx
            for (; idx < repos.length && idx < startIdx + CHUNK_SIZE; idx++) {
                const { owner, name: repoName } = repos[idx]
                const { login: ownerLogin } = owner
                activityPromiseChunk.push(getContributorActivity(accessToken, authUser, ownerLogin, repoName))
            }

            activities.push(...(await Promise.all(activityPromiseChunk)))
        }

        let totalNumLines = 0,
            totalNumAdditions = 0,
            totalNumDeletions = 0

        for (let i = 0; i < activities.length; i++) {
            const {
                owner: { login },
                name,
            } = repos[i]
            const { success: activitySuccess, error: activityError, activity } = activities[i]
            // console.log(activities[i])
            if (!activitySuccess || activity === undefined) {
                console.error(
                    `[services/lineStats] computeStatsAcrossReposUsingMetrics repo ${login}/${name} -> error ${activityError}`,
                )
                continue
            }

            const { total, weeks } = activity
            const { numLines, numAdditions, numDeletions } = aggregateWeeklyContributorActivity(weeks)
            console.log(
                `[services/lineStats] computeStatsAcrossReposUsingMetrics repo ${login}/${name} -> ${total} commits, ${numLines} lines`,
            )

            totalNumLines += numLines
            totalNumAdditions += numAdditions
            totalNumDeletions += numDeletions
        }

        return {
            numLines: totalNumLines,
            numAdditions: totalNumAdditions,
            numDeletions: totalNumDeletions,
        }
    } catch (e) {
        console.error(
            `[services/lineStats] computeStatsAcrossReposUsingMetrics unable to compute all stats across all repos: ${e}`,
        )
        return {
            numLines: 0,
            numAdditions: 0,
            numDeletions: 0,
        }
    }
}