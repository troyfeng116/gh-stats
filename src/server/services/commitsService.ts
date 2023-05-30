import { SHARED_CommitData, SHARED_LifetimeCommitsAPIResponse, SHARED_ListCommitsAPIResponse } from '@/models/shared'
import { GH_API_listCommits } from '@/server/lib/gh-api/commits'
import { GH_API_listRepos } from '@/server/lib/gh-api/repos'

export const getLifetimeCommits = async (accessToken: string): Promise<SHARED_LifetimeCommitsAPIResponse> => {
    const { success, error, repos } = await GH_API_listRepos(accessToken)

    if (!success || repos === undefined) {
        return { lifetimeCommits: undefined, success: false, error: error }
    }

    return { lifetimeCommits: repos.length, success: true }
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
        return { success: false, error: error }
    }

    return { success: true, commits: commits as SHARED_CommitData[] }
}
