import {
    SHARED_CommitData,
    SHARED_LifetimeCommitsAPIResponse,
    SHARED_ListCommitsAPIResponse,
    SHARED_OneRepoCountCommitsResponse,
} from '@/models/shared'
import { GH_API_countCommits, GH_API_listCommits } from '@/server/lib/gh-api/commits'
import { GH_API_listRepos } from '@/server/lib/gh-api/repos'
import { GH_API_Repo } from '@/server/lib/gh-api/repos/model'
import { GH_API_getUser } from '@/server/lib/gh-api/users'

const countCommitsInAllRepos = async (accessToken: string, authUser: string, repos: GH_API_Repo[]): Promise<number> => {
    const promises: Promise<SHARED_OneRepoCountCommitsResponse>[] = []
    for (let i = 0; i < repos.length; i++) {
        const { owner, name: repoName } = repos[i]
        const { login: ownerLogin } = owner
        promises.push(countCommitsForRepo(accessToken, ownerLogin, repoName, authUser))
    }

    // TODO: Promise.all throws error?
    try {
        const counts = await Promise.all(promises)
        let ct = 0
        for (let i = 0; i < counts.length; i++) {
            const { owner, name } = repos[i]
            const { success: countSuccess, error: countError, numCommits } = counts[i]
            console.log(`${owner.login}/${name} -> ${authUser} had ${numCommits} commits`)
            if (!countSuccess || numCommits === undefined) {
                console.log(countError)
                continue
            }
            ct += numCommits
        }
        return ct
    } catch (e) {
        console.error(e)
        return 0
    }
}

export const getLifetimeCommits = async (accessToken: string): Promise<SHARED_LifetimeCommitsAPIResponse> => {
    try {
        const [userRes, reposRes] = await Promise.all([GH_API_getUser(accessToken), GH_API_listRepos(accessToken)])

        const { success: userSuccess, error: userError, user } = userRes
        if (!userSuccess || user === undefined) {
            return { lifetimeCommits: undefined, success: false, error: userError }
        }

        const { success: reposSuccess, error: reposError, repos } = reposRes
        if (!reposSuccess || repos === undefined) {
            return { lifetimeCommits: undefined, success: false, error: reposError }
        }

        const { login: authUser } = user
        const lifetimeCommits = await countCommitsInAllRepos(accessToken, authUser, repos)

        return { lifetimeCommits: lifetimeCommits, success: true }
    } catch (e) {
        console.error(e)
        return { success: false, error: 'internal server error', lifetimeCommits: undefined }
    }
}

export const listCommits = async (
    accessToken: string,
    owner: string,
    repo: string,
): Promise<SHARED_ListCommitsAPIResponse> => {
    const { success, error, commits } = await GH_API_listCommits(accessToken, owner, repo, {
        per_page: 1,
    })

    if (!success || commits === undefined) {
        return { commits: undefined, success: false, error: error }
    }

    return { commits: commits as SHARED_CommitData[], success: true }
}

export const countCommitsForRepo = async (
    accessToken: string,
    owner: string,
    repo: string,
    user: string,
): Promise<SHARED_OneRepoCountCommitsResponse> => {
    const { success, error, numCommits } = await GH_API_countCommits(accessToken, owner, repo, {
        author: user,
    })

    if (!success || numCommits === undefined) {
        return { numCommits: undefined, success: false, error: error }
    }

    return { numCommits: numCommits, success: true }
}
