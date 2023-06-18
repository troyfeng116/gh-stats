import {
    BASE_GH_GQL_Call__makeQueryWithAuth,
    GH_GQL_RawResponse_BASE as GH_GQL_RawResponse__BASE,
    GH_GQL_Response__BASE,
} from '..'

import {
    GH_GQL_Query__Contributions,
    GH_GQL_QueryVars__Contributions,
    GH_GQL_Schema__ContributionsCollection,
} from './query'

interface GH_GQL_RawResponse__Contributions extends GH_GQL_RawResponse__BASE {
    data?: {
        viewer: {
            contributionsCollection: GH_GQL_Schema__ContributionsCollection
        }
    }
}

export interface GH_GQL_Response__Contributions extends GH_GQL_Response__BASE {
    contributions?: GH_GQL_Schema__ContributionsCollection
}

export const GH_GQL_Call__Contributions = async (
    accessToken: string,
    variables: GH_GQL_QueryVars__Contributions,
): Promise<GH_GQL_Response__Contributions> => {
    const res = await BASE_GH_GQL_Call__makeQueryWithAuth(accessToken, GH_GQL_Query__Contributions, variables)

    const { status, statusText } = res
    if (status !== 200) {
        return { contributions: undefined, success: false, error: `error ${status}: ${statusText}` }
    }

    const resJson = (await res.json()) as GH_GQL_RawResponse__Contributions

    const { data, errors: queryErrors } = resJson
    if (queryErrors !== undefined || data === undefined) {
        return {
            contributions: undefined,
            success: false,
            error: `error: ${queryErrors !== undefined ? queryErrors[0].message : 'unknown (GraphQL)'}`,
        }
    }

    const {
        viewer: { contributionsCollection },
    } = data
    return { success: true, contributions: contributionsCollection }
}
