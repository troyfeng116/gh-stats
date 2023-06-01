import { GH_GQL_getReposWithCommitCounts } from '@/server/lib/gh-gql/AllRepoCommitCounts'
import {
    GH_GQL_Schema__RepoConnection,
    GH_GQL_Schema__RepoWithCommitCounts,
} from '@/server/lib/gh-gql/AllRepoCommitCounts/query'
import { GH_GQL_Call__Viewer } from '@/server/lib/gh-gql/Viewer'
import {
    SHARED_APIFields__ReposWithCountCommitsAndTotalStats,
    SHARED_Model__RepoCommitCountStats,
    SHARED_Model__RepoWithCountCommits as SHARED_Model__RepoWithCommitCounts,
} from '@/shared/models'

// const processReposWithCommits = (repo: GH_GQL_RepoConnection): SHARED_Model__LifetimeStats => {
//     const stats: SHARED_Model__LifetimeStats = makeLifeTimeStats()
//     return stats
// }

// `endCursor = undefined` => no more pages
const processAndCheckIfMore = (
    repoConn: GH_GQL_Schema__RepoConnection | undefined,
): { endCursor?: string; totalCountRepos?: number; repos: GH_GQL_Schema__RepoWithCommitCounts[] } => {
    if (repoConn === undefined) {
        return { repos: [], endCursor: undefined }
    }
    const { pageInfo, nodes, totalCount } = repoConn
    const { hasNextPage, endCursor } = pageInfo
    return { repos: nodes, totalCountRepos: totalCount, endCursor: hasNextPage ? endCursor : undefined }
}

const repoSchemaToShared = (repo: GH_GQL_Schema__RepoWithCommitCounts): SHARED_Model__RepoWithCommitCounts => {
    const {
        name,
        owner,
        defaultBranchRef: {
            target: {
                history: { totalCount },
            },
        },
    } = repo

    return {
        name: name,
        owner: owner,
        totalCount: totalCount,
    }
}

const sharedRepoReduceCommits = (repos: SHARED_Model__RepoWithCommitCounts[]): number => {
    let totalCommits = 0
    for (let i = 0; i < repos.length; i++) {
        const { totalCount } = repos[i]
        totalCommits += totalCount
    }
    return totalCommits
}

export const getAllReposWithCommitCounts = async (
    accessToken: string,
): Promise<SHARED_APIFields__ReposWithCountCommitsAndTotalStats> => {
    const { success: viewerSuccess, error: viewerError, viewer } = await GH_GQL_Call__Viewer(accessToken)

    if (!viewerSuccess || viewer === undefined) {
        return { repos: undefined, stats: undefined, success: false, error: viewerError }
    }

    const { id } = viewer
    let isReposDone = false
    let isReposContributedDone = false
    let reposCursor: string | undefined = undefined
    let reposContributedCursor: string | undefined = undefined

    const repos: GH_GQL_Schema__RepoWithCommitCounts[] = []
    const reposContributed: GH_GQL_Schema__RepoWithCommitCounts[] = []

    while (!isReposDone || !isReposContributedDone) {
        const {
            success: repoSuccess,
            error: repoError,
            repoConn,
            repoContributedConn,
        } = await GH_GQL_getReposWithCommitCounts(accessToken, {
            author: {
                id: id,
            },
            includeRepos: !isReposDone,
            includeReposContributed: !isReposContributedDone,
            first: 3,
            reposAfter: reposCursor,
            reposContributedAfter: reposContributedCursor,
        })

        if (!repoSuccess) {
            console.error(repoError)
            // isReposDone = true
            // isReposContributedDone = true
            // break
            return { repos: undefined, stats: undefined, success: false, error: repoError }
        }

        const { endCursor: newReposCursor, repos: newRepos } = processAndCheckIfMore(repoConn)
        repos.push(...newRepos)
        if (newReposCursor === undefined) {
            isReposDone = true
        } else {
            reposCursor = newReposCursor
        }

        const { endCursor: newReposContributedCursor, repos: newReposContributed } =
            processAndCheckIfMore(repoContributedConn)
        reposContributed.push(...newReposContributed)
        if (newReposContributedCursor === undefined) {
            isReposContributedDone = true
        } else {
            reposContributedCursor = newReposContributedCursor
        }
    }

    const sharedRepos: SHARED_Model__RepoWithCommitCounts[] = [...repos, ...reposContributed].map((repo) =>
        repoSchemaToShared(repo),
    )
    const stats: SHARED_Model__RepoCommitCountStats = {
        numCommits: sharedRepoReduceCommits(sharedRepos),
        numRepos: sharedRepos.length,
    }

    return { success: true, repos: sharedRepos, stats: stats }
}
