import { SHARED_CommitData, SHARED_ListCommitsAPIResponse } from '@/models/shared'
import { GH_API_listCommits } from '@/server/lib/gh-api/commits'

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
