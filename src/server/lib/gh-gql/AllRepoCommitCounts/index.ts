import { BASE_GH_GQL_Call__makeQueryWithAuth, GH_GQL_RawResponse__BASE, GH_GQL_Response__BASE } from '..'

import {
    GH_GQL_Query__ReposAndCommitCounts,
    GH_GQL_QueryVars__AllRepoCommitCounts,
    GH_GQL_Schema__RepoConnection,
} from './query'

interface GH_GQL_RawResponse__AllRepoCommitCounts extends GH_GQL_RawResponse__BASE {
    data?: {
        viewer: {
            repositories: GH_GQL_Schema__RepoConnection
            repositoriesContributedTo: GH_GQL_Schema__RepoConnection
        }
    }
}

export interface GH_GQL_Response__AllRepoCommitCounts extends GH_GQL_Response__BASE {
    repoConn?: GH_GQL_Schema__RepoConnection
    repoContributedConn?: GH_GQL_Schema__RepoConnection
}

export const GH_GQL_Call__AllRepoCommitCounts = async (
    accessToken: string,
    variables: GH_GQL_QueryVars__AllRepoCommitCounts,
): Promise<GH_GQL_Response__AllRepoCommitCounts> => {
    const res = await BASE_GH_GQL_Call__makeQueryWithAuth(accessToken, GH_GQL_Query__ReposAndCommitCounts, variables)

    const { status, statusText } = res
    if (status !== 200) {
        return { repoConn: undefined, success: false, error: `error ${status}: ${statusText}` }
    }

    const resJson = (await res.json()) as GH_GQL_RawResponse__AllRepoCommitCounts
    console.log(resJson)

    const { data, errors: queryErrors } = resJson
    if (queryErrors !== undefined || data === undefined) {
        return {
            repoConn: undefined,
            success: false,
            error: `error: ${queryErrors !== undefined ? queryErrors[0].message : 'unknown (GraphQL)'}`,
        }
    }

    const {
        viewer: { repositories, repositoriesContributedTo },
    } = data
    return { success: true, repoConn: repositories, repoContributedConn: repositoriesContributedTo }
}
