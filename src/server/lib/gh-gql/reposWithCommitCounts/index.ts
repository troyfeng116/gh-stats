import { queryGitHubGraphQL_API } from '..'

import { GH_GQL_GetReposWithCommitCountsResponse, GH_GQL_RepoConnection } from './model'
import { GH_GQL_GET_REPOS_WITH_COMMIT_COUNTS_QUERY, GH_GQL_GetReposWithCommitCountsVariables } from './query'

export const GH_GQL_getReposWithCommitCounts = async (
    accessToken: string,
    variables: GH_GQL_GetReposWithCommitCountsVariables,
): Promise<{
    success: boolean
    error?: string
    repos?: GH_GQL_RepoConnection
    reposContributed?: GH_GQL_RepoConnection
}> => {
    const res = await queryGitHubGraphQL_API(accessToken, GH_GQL_GET_REPOS_WITH_COMMIT_COUNTS_QUERY, variables)

    const { status, statusText } = res
    if (status !== 200) {
        return { repos: undefined, success: false, error: `error ${status}: ${statusText}` }
    }

    const resJson = (await res.json()) as GH_GQL_GetReposWithCommitCountsResponse

    const { data, errors: queryErrors } = resJson
    if (queryErrors !== undefined || data === undefined) {
        return {
            repos: undefined,
            success: false,
            error: `error: ${queryErrors !== undefined ? queryErrors[0].message : 'unknown (GraphQL)'}`,
        }
    }

    const { repositories, repositoriesContributedTo } = data
    return { success: true, repos: repositories, reposContributed: repositoriesContributedTo }
}
