import { listAllRepos } from './reposService'

import { GH_API_getAllContributorActivity } from '@/server/lib/gh-api/metrics'
// import { dummyAsyncFunction } from '@/server/utils/dummyAsyncFetch'
import { chunkArr } from '@/server/utils/chunkArr'
import {
    SHARED_AllContributorActivityData,
    SHARED_CountCommitsResponse,
    SHARED_GetAllContributorActivityResponse,
    SHARED_RepoData,
} from '@/shared/models'

export const getAllContributorActivity = async (
    accessToken: string,
    owner: string,
    repo: string,
): Promise<SHARED_GetAllContributorActivityResponse> => {
    const { success, error, activity } = await GH_API_getAllContributorActivity(accessToken, owner, repo)

    if (!success || activity === undefined) {
        return { activity: undefined, success: false, error: error }
    }

    return { activity: activity as SHARED_AllContributorActivityData, success: true }
}

/* ======== count commits ======== */

const countCommitsInReposUsingMetrics = async (accessToken: string, repos: SHARED_RepoData[]): Promise<number> => {
    // const activities: SHARED_GetAllContributorActivityResponse[] = []
    // for (let i = 0; i < repos.length; i++) {
    //     const { owner, name: repoName } = repos[i]
    //     const { login: ownerLogin } = owner
    //     activities.push(await getAllContributorActivity(accessToken, ownerLogin, repoName))
    //     // await dummyAsyncFunction('', 100)
    // }

    // let ct = 0
    // for (let i = 0; i < activities.length; i++) {
    //     const { owner, name } = repos[i]
    //     const { success: activitySuccess, error: activityError, activity } = activities[i]
    //     // console.log(activities[i])
    //     console.log(
    //         `[metricsService] countCommitsInReposUsingMetrics repo ${owner.login}/${name} -> ${activity?.total} commits`,
    //     )
    //     if (!activitySuccess || activity === undefined) {
    //         console.error(
    //             `[metricsService] countCommitsInReposUsingMetrics repo ${owner.login}/${name} -> error ${activityError}`,
    //         )
    //         continue
    //     }

    //     const { total } = activity
    //     ct += total
    // }
    // return ct

    const activityPromises: Promise<SHARED_GetAllContributorActivityResponse>[] = []
    for (let i = 0; i < repos.length; i++) {
        const { owner, name: repoName } = repos[i]
        const { login: ownerLogin } = owner
        activityPromises.push(getAllContributorActivity(accessToken, ownerLogin, repoName))
    }

    const chunkedActivityPromises = chunkArr(activityPromises)

    // TODO: Promise.all throws error?
    try {
        const activities: SHARED_GetAllContributorActivityResponse[] = []
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
    const reposRes = await listAllRepos(accessToken)

    const { success: reposSuccess, error: reposError, repos } = reposRes
    if (!reposSuccess || repos === undefined) {
        return { numCommits: undefined, success: false, error: reposError }
    }

    const lifetimeCommits = await countCommitsInReposUsingMetrics(accessToken, repos)

    return { numCommits: lifetimeCommits, success: true }
}
