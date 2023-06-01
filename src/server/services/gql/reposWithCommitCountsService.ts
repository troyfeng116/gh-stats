import { GH_GQL_getReposWithCommitCounts } from '@/server/lib/gh-gql/AllRepoCommitCounts'
import { GH_GQL_Call__Viewer } from '@/server/lib/gh-gql/Viewer'
import { SHARED_APIFields__GetLifetimeStats } from '@/shared/models'

// const processReposWithCommits = (repo: GH_GQL_RepoConnection): SHARED_Model__LifetimeStats => {
//     const stats: SHARED_Model__LifetimeStats = makeLifeTimeStats()
//     return stats
// }

export const getReposWithCommitCounts = async (accessToken: string): Promise<SHARED_APIFields__GetLifetimeStats> => {
    const { success: viewerSuccess, error: viewerError, viewer } = await GH_GQL_Call__Viewer(accessToken)

    if (!viewerSuccess || viewer === undefined) {
        return { stats: undefined, success: false, error: viewerError }
    }

    const { id } = viewer
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
