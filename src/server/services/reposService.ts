import { PAGE_SIZE } from '@/server/lib/gh-api'
import { GH_API_Call__countRepos, GH_API_Call__listRepos } from '@/server/lib/gh-api/repos'
import { chunkArr } from '@/server/utils/chunkArr'
import { SHARED_APIFields_CountRepos, SHARED_APIFields_ListRepos, SHARED_Data_Repo } from '@/shared/models'

// https://docs.github.com/en/rest/repos/repos?apiVersion=2022-11-28#list-repositories-for-the-authenticated-user
export const listRepos = async (accessToken: string): Promise<SHARED_APIFields_ListRepos> => {
    const { success, error, repos } = await GH_API_Call__listRepos(accessToken)

    if (!success || repos === undefined) {
        return { repos: undefined, success: false, error: error }
    }

    return { repos: repos, success: true }
}

/* ======== count/fetch all repos ======== */

export const countAllRepos = async (accessToken: string): Promise<SHARED_APIFields_CountRepos> => {
    const { success, error, numRepos } = await GH_API_Call__countRepos(accessToken)

    if (!success || numRepos === undefined) {
        return { numRepos: undefined, success: false, error: error }
    }

    return { numRepos: numRepos, success: true }
}

export const listAllRepos = async (accessToken: string): Promise<SHARED_APIFields_ListRepos> => {
    const { success: countSuccess, error: countError, numRepos } = await countAllRepos(accessToken)
    // console.log(numRepos)

    if (!countSuccess || numRepos === undefined) {
        return { repos: undefined, success: false, error: countError }
    }

    const repoResPromises: Promise<SHARED_APIFields_ListRepos>[] = []
    for (let page = 1; (page - 1) * PAGE_SIZE < numRepos; page++) {
        repoResPromises.push(
            GH_API_Call__listRepos(accessToken, {
                page: page,
                per_page: PAGE_SIZE,
            }),
        )
    }

    const chunkedRepoResPromises = chunkArr(repoResPromises)

    try {
        const repoResArr: SHARED_APIFields_ListRepos[] = []
        for (let i = 0; i < chunkedRepoResPromises.length; i++) {
            repoResArr.push(...(await Promise.all(chunkedRepoResPromises[i])))
        }

        const allRepos: SHARED_Data_Repo[] = []
        for (let i = 0; i < repoResArr.length; i++) {
            const { success: reposSuccess, error: reposError, repos } = repoResArr[i]
            if (!reposSuccess || repos === undefined) {
                return {
                    repos: undefined,
                    success: false,
                    error: reposError,
                }
            }

            allRepos.push(...repos)
        }

        return {
            repos: allRepos,
            success: true,
        }
    } catch (e) {
        console.error(`[reposService] ${e}`)
        return {
            repos: undefined,
            success: false,
            error: 'internal server error: unable to retrieve all user repos',
        }
    }
}
