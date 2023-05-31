import { GH_API_getUser } from '../lib/gh-api/users'

import { listAllRepos } from './reposService'

import { GH_API_getAllContributorActivity } from '@/server/lib/gh-api/metrics'
// import { dummyAsyncFunction } from '@/server/utils/dummyAsyncFetch'
import { chunkArr } from '@/server/utils/chunkArr'
import {
    SHARED_ContributorActivityData,
    SHARED_CountCommitsResponse,
    SHARED_GetContributorActivityResponse,
    SHARED_RepoData,
} from '@/shared/models'

export const getContributorActivity = async (
    accessToken: string,
    authUser: string,
    owner: string,
    repo: string,
): Promise<SHARED_GetContributorActivityResponse> => {
    const { success, error, allActivity } = await GH_API_getAllContributorActivity(accessToken, owner, repo)
    console.log(`[getContributorActivity] ${owner}/${repo} has ${allActivity?.length} contributors`)

    if (!success || allActivity === undefined) {
        return { activity: undefined, success: false, error: error }
    }

    for (let i = 0; i < allActivity.length; i++) {
        const {
            author: { login },
        } = allActivity[i]
        if (login === authUser) {
            return { activity: allActivity[i] as SHARED_ContributorActivityData, success: true }
        }
    }

    return {
        activity: undefined,
        success: false,
        error: `[getContributorActivity] user ${authUser} didn't contribute to repo ${owner}/${repo}`,
    }
}

/* ======== count commits ======== */

const countCommitsInReposUsingMetrics = async (
    accessToken: string,
    authUser: string,
    repos: SHARED_RepoData[],
): Promise<number> => {
    const activityPromises: Promise<SHARED_GetContributorActivityResponse>[] = []
    for (let i = 0; i < repos.length; i++) {
        const { owner, name: repoName } = repos[i]
        const { login: ownerLogin } = owner
        activityPromises.push(getContributorActivity(accessToken, authUser, ownerLogin, repoName))
    }

    const chunkedActivityPromises = chunkArr(activityPromises)

    // TODO: Promise.all throws error?
    try {
        const activities: SHARED_GetContributorActivityResponse[] = []
        for (let i = 0; i < chunkedActivityPromises.length; i++) {
            activities.push(...(await Promise.all(chunkedActivityPromises[i])))
        }

        let ct = 0
        for (let i = 0; i < activities.length; i++) {
            const { owner, name } = repos[i]
            const { success: activitySuccess, error: activityError, activity } = activities[i]
            // console.log(activities[i])
            console.log(
                `[metricsService] countCommitsInReposUsingMetrics repo ${owner.login}/${name} -> ${activity?.total} commits`,
            )
            if (!activitySuccess || activity === undefined) {
                console.error(
                    `[metricsService] countCommitsInReposUsingMetrics repo ${owner.login}/${name} -> error ${activityError}`,
                )
                continue
            }

            const { total } = activity
            ct += total
        }
        return ct
    } catch (e) {
        console.error(
            `[metricsService] countCommitsInReposUsingMetrics unable to count all commits across all repos: ${e}`,
        )
        return 0
    }
}

export const countLifetimeCommitsUsingMetrics = async (accessToken: string): Promise<SHARED_CountCommitsResponse> => {
    const [userRes, reposRes] = await Promise.all([GH_API_getUser(accessToken), listAllRepos(accessToken)])

    const { success: userSuccess, error: userError, user } = userRes
    if (!userSuccess || user === undefined) {
        return { numCommits: undefined, success: false, error: userError }
    }

    const { success: reposSuccess, error: reposError, repos } = reposRes
    if (!reposSuccess || repos === undefined) {
        return { numCommits: undefined, success: false, error: reposError }
    }

    const { login: authUser } = user
    const lifetimeCommits = await countCommitsInReposUsingMetrics(accessToken, authUser, repos)

    return { numCommits: lifetimeCommits, success: true }
}
