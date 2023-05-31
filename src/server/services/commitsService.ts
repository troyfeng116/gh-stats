import { listAllRepos } from './reposService'

import { GH_API_countCommits, GH_API_getCommit, GH_API_listCommits } from '@/server/lib/gh-api/commits'
import { GH_API_getUser } from '@/server/lib/gh-api/users'
import { chunkArr } from '@/server/utils/chunkArr'
import {
    SHARED_CommitData,
    SHARED_CommitWithDiffData,
    SHARED_CountCommitsResponse,
    SHARED_ListCommitsAPIResponse,
    SHARED_ListCommitWithDiffAPIResponse,
    SHARED_RepoData,
} from '@/shared/models'

export const listCommits = async (
    accessToken: string,
    owner: string,
    repo: string,
    perPage?: number,
): Promise<SHARED_ListCommitsAPIResponse> => {
    const { success, error, commits } = await GH_API_listCommits(accessToken, owner, repo, {
        per_page: perPage,
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
): Promise<SHARED_CountCommitsResponse> => {
    const { success, error, numCommits } = await GH_API_countCommits(accessToken, owner, repo, {
        author: user,
    })

    if (!success || numCommits === undefined) {
        return { numCommits: undefined, success: false, error: error }
    }

    return { numCommits: numCommits, success: true }
}

export const getCommit = async (
    accessToken: string,
    owner: string,
    repo: string,
    ref: string,
): Promise<SHARED_ListCommitWithDiffAPIResponse> => {
    const { success, error, commit } = await GH_API_getCommit(accessToken, owner, repo, ref)

    if (!success || commit === undefined) {
        return { commit: undefined, success: false, error: error }
    }

    return { commit: commit as SHARED_CommitWithDiffData, success: true }
}

/* ======== count commits ======== */

const countCommitsInRepos = async (
    accessToken: string,
    authUser: string,
    repos: SHARED_RepoData[],
): Promise<number> => {
    const countCommitsPromises: Promise<SHARED_CountCommitsResponse>[] = []
    for (let i = 0; i < repos.length; i++) {
        const { owner, name: repoName } = repos[i]
        const { login: ownerLogin } = owner
        countCommitsPromises.push(countCommitsForRepo(accessToken, ownerLogin, repoName, authUser))
    }

    const chunkedCountCommitsPromises = chunkArr(countCommitsPromises)

    // TODO: Promise.all throws error?
    try {
        const counts: SHARED_CountCommitsResponse[] = []
        for (let i = 0; i < chunkedCountCommitsPromises.length; i++) {
            counts.push(...(await Promise.all(chunkedCountCommitsPromises[i])))
        }

        let ct = 0
        for (let i = 0; i < counts.length; i++) {
            const { owner, name } = repos[i]
            const { success: countSuccess, error: countError, numCommits } = counts[i]
            console.log(
                `[commitsService] countCommitsInRepos repo ${owner.login}/${name} -> authUser ${authUser} had ${numCommits} commits`,
            )
            if (!countSuccess || numCommits === undefined) {
                console.error(`[commitsService] countCommitsInRepos repo ${owner.login}/${name} -> error ${countError}`)
                continue
            }
            ct += numCommits
        }
        return ct
    } catch (e) {
        console.error(`[commitsService] countCommitsInRepos unable to count all commits across all repos: ${e}`)
        return 0
    }
}

export const countLifetimeCommits = async (accessToken: string): Promise<SHARED_CountCommitsResponse> => {
    try {
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
        const lifetimeCommits = await countCommitsInRepos(accessToken, authUser, repos)

        return { numCommits: lifetimeCommits, success: true }
    } catch (e) {
        console.error(`[commitsService] countLifetimeCommits unable to fetch user or get all repos ${e}`)
        return { success: false, error: 'internal server error', numCommits: undefined }
    }
}

/* ======== retrieve all commits with diffs ======== */
