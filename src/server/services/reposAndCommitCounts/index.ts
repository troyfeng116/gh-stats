import { SERVICE_Response__BASE } from '..'

import { PAGE_SIZE } from '@/server/lib/gh-gql'
import { GH_GQL_Call__AllRepoCommitCounts } from '@/server/lib/gh-gql/AllRepoCommitCounts'
import {
    GH_GQL_Schema__RepoConnection,
    GH_GQL_Schema__RepoWithCommitCountAndLanguages,
} from '@/server/lib/gh-gql/AllRepoCommitCounts/query'
import { GH_GQL_Call__Viewer } from '@/server/lib/gh-gql/Viewer'
import { SHARED_Model__RepoWithCommitCountsAndLanguages } from '@/shared/models/models/Repos'

// `endCursor = undefined` => no more pages
const processAndCheckIfMore = (
    repoConn: GH_GQL_Schema__RepoConnection | undefined,
): { endCursor?: string; totalCountRepos?: number; repos: GH_GQL_Schema__RepoWithCommitCountAndLanguages[] } => {
    if (repoConn === undefined) {
        return { repos: [], endCursor: undefined }
    }
    const { pageInfo, nodes, totalCount } = repoConn
    const { hasNextPage, endCursor } = pageInfo
    return { repos: nodes, totalCountRepos: totalCount, endCursor: hasNextPage ? endCursor : undefined }
}

const repoSchemaToShared = (
    repo: GH_GQL_Schema__RepoWithCommitCountAndLanguages,
): SHARED_Model__RepoWithCommitCountsAndLanguages => {
    const {
        name,
        owner,
        diskUsage,
        defaultBranchRef: {
            target: {
                history: { totalCount },
            },
        },
        languages: { edges },
    } = repo

    return {
        name: name,
        owner: owner,
        diskUsage: diskUsage,
        totalCount: totalCount,
        languageData: edges.map((edge) => {
            const {
                size,
                node: { color, name },
            } = edge
            return { size: size, color: color, name: name }
        }),
    }
}

interface SERVICE_Response__getAllReposWithCommitCounts extends SERVICE_Response__BASE {
    repos?: SHARED_Model__RepoWithCommitCountsAndLanguages[]
}

export const SERVICE_Call__getAllReposWithCommitCounts = async (
    accessToken: string,
): Promise<SERVICE_Response__getAllReposWithCommitCounts> => {
    const { success: viewerSuccess, error: viewerError, viewer } = await GH_GQL_Call__Viewer(accessToken, {})

    if (!viewerSuccess || viewer === undefined) {
        return { repos: undefined, success: false, error: viewerError }
    }

    const { id } = viewer
    let isReposDone = false
    let isReposContributedDone = false
    let reposCursor: string | undefined = undefined
    let reposContributedCursor: string | undefined = undefined

    const repos: GH_GQL_Schema__RepoWithCommitCountAndLanguages[] = []
    const reposContributed: GH_GQL_Schema__RepoWithCommitCountAndLanguages[] = []

    while (!isReposDone || !isReposContributedDone) {
        const {
            success: repoSuccess,
            error: repoError,
            repoConn,
            repoContributedConn,
        } = await GH_GQL_Call__AllRepoCommitCounts(accessToken, {
            author: {
                id: id,
            },
            includeRepos: !isReposDone,
            includeReposContributed: !isReposContributedDone,
            first: PAGE_SIZE,
            reposAfter: reposCursor,
            reposContributedAfter: reposContributedCursor,
        })

        if (!repoSuccess) {
            console.error(`[services/gql/countCommitsService] getAllReposWithCommitCounts ${repoError}`)
            // isReposDone = true
            // isReposContributedDone = true
            // break
            return { repos: undefined, success: false, error: repoError }
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

    const sharedRepos: SHARED_Model__RepoWithCommitCountsAndLanguages[] = [...repos, ...reposContributed].map((repo) =>
        repoSchemaToShared(repo),
    )

    return { success: true, repos: sharedRepos }
}
