import { GH_GQL_getReposWithCommitCounts } from '@/server/lib/gh-gql/reposWithCommitCounts'
import { GH_GQL_getViewer } from '@/server/lib/gh-gql/users'
import { SHARED_APIFields_GetLifetimeStats } from '@/shared/models'

// const processReposWithCommits = (repo: GH_GQL_RepoConnection): SHARED_Model_LifetimeStats => {
//     const stats: SHARED_Model_LifetimeStats = makeLifeTimeStats()
//     return stats
// }

export const getReposWithCommitCounts = async (accessToken: string): Promise<SHARED_APIFields_GetLifetimeStats> => {
    const { success: userSuccess, error: userError, user } = await GH_GQL_getViewer(accessToken)

    if (!userSuccess || user === undefined) {
        return { stats: undefined, success: false, error: userError }
    }

    const { id } = user
    const {
        success: repoSuccess,
        error: repoError,
        // repos,
        // reposContributed,
    } = await GH_GQL_getReposWithCommitCounts(accessToken, {
        author: {
            id: id,
        },
        includeRepos: true,
        includeReposContributed: true,
        first: 100,
        reposAfter: undefined,
        reposContributedAfter: undefined,
    })

    if (!repoSuccess) {
        return { stats: undefined, success: false, error: repoError }
    }

    return { stats: undefined, success: true }
}
