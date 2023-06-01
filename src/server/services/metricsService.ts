import { GH_API_Call__getUser } from '../lib/gh-api/users'

import { listAllRepos } from './reposService'

import { GH_API_Call__getAllContributorActivity } from '@/server/lib/gh-api/metrics'
import { aggregateWeeklyContributorActivity } from '@/server/utils/aggregateWeeklyActivity'
// import { dummyAsyncFunction } from '@/server/utils/dummyAsyncFetch'
import { chunkArr } from '@/server/utils/chunkArr'
import {
    SHARED_APIFields__GetContributorActivity,
    SHARED_APIFields__GetLifetimeStats,
    SHARED_Data__ContributorActivity,
    SHARED_Data__Repo,
    SHARED_Model__LifetimeStats,
} from '@/shared/models'

export const getContributorActivity = async (
    accessToken: string,
    authUser: string,
    owner: string,
    repo: string,
): Promise<SHARED_APIFields__GetContributorActivity> => {
    const { success, error, allActivity } = await GH_API_Call__getAllContributorActivity(accessToken, owner, repo)
    console.log(`[getContributorActivity] ${owner}/${repo} has ${allActivity?.length} contributors`)

    if (!success || allActivity === undefined) {
        return { activity: undefined, success: false, error: error }
    }

    for (let i = 0; i < allActivity.length; i++) {
        const {
            author: { login },
        } = allActivity[i]
        if (login === authUser) {
            return { activity: allActivity[i] as SHARED_Data__ContributorActivity, success: true }
        }
    }

    return {
        activity: undefined,
        success: false,
        error: `[getContributorActivity] user ${authUser} didn't contribute to repo ${owner}/${repo}`,
    }
}

/* ======== compute aggregate stats ======== */

const computeStatsAcrossReposUsingMetrics = async (
    accessToken: string,
    authUser: string,
    repos: SHARED_Data__Repo[],
): Promise<SHARED_Model__LifetimeStats> => {
    const activityPromises: Promise<SHARED_APIFields__GetContributorActivity>[] = []
    for (let i = 0; i < repos.length; i++) {
        const { owner, name: repoName } = repos[i]
        const { login: ownerLogin } = owner
        activityPromises.push(getContributorActivity(accessToken, authUser, ownerLogin, repoName))
    }

    const chunkedActivityPromises = chunkArr(activityPromises)

    // TODO: Promise.all throws error?
    try {
        const activities: SHARED_APIFields__GetContributorActivity[] = []
        for (let i = 0; i < chunkedActivityPromises.length; i++) {
            activities.push(...(await Promise.all(chunkedActivityPromises[i])))
        }

        const stats: SHARED_Model__LifetimeStats = {
            numRepos: repos.length,
            numCommits: 0,
            numLines: 0,
            numAdditions: 0,
            numDeletions: 0,
        }
        for (let i = 0; i < activities.length; i++) {
            const { owner, name } = repos[i]
            const { success: activitySuccess, error: activityError, activity } = activities[i]
            // console.log(activities[i])
            if (!activitySuccess || activity === undefined) {
                console.error(
                    `[metricsService] computeStatsAcrossReposUsingMetrics repo ${owner.login}/${name} -> error ${activityError}`,
                )
                continue
            }

            const { total, weeks } = activity
            const { numLines, numAdditions, numDeletions } = aggregateWeeklyContributorActivity(weeks)
            stats.numCommits += total
            stats.numLines += numLines
            stats.numAdditions += numAdditions
            stats.numDeletions += numDeletions
            console.log(
                `[metricsService] computeStatsAcrossReposUsingMetrics repo ${owner.login}/${name} ->
                ${total} commits, ${numLines} lines (${numAdditions - numDeletions})`,
            )
        }

        return stats
    } catch (e) {
        console.error(
            `[metricsService] computeStatsAcrossReposUsingMetrics unable to compute all stats across all repos: ${e}`,
        )
        return {
            numRepos: 0,
            numCommits: 0,
            numLines: 0,
            numAdditions: 0,
            numDeletions: 0,
        }
    }
}

export const computeLifetimeStatsUsingMetrics = async (
    accessToken: string,
): Promise<SHARED_APIFields__GetLifetimeStats> => {
    const [userRes, reposRes] = await Promise.all([GH_API_Call__getUser(accessToken), listAllRepos(accessToken)])

    const { success: userSuccess, error: userError, user } = userRes
    if (!userSuccess || user === undefined) {
        return { stats: undefined, success: false, error: userError }
    }

    const { success: reposSuccess, error: reposError, repos } = reposRes
    if (!reposSuccess || repos === undefined) {
        return { stats: undefined, success: false, error: reposError }
    }

    const { login: authUser } = user
    const lifetimeStats = await computeStatsAcrossReposUsingMetrics(accessToken, authUser, repos)

    return { stats: lifetimeStats, success: true }
}
