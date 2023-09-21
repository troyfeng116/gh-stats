import { BASE_GH_GQL_Call__makeQueryWithAuth, GH_GQL_RawResponse__BASE, GH_GQL_Response__BASE } from '..'

import {
    GH_GQL_Query__ContributionsAggregate,
    GH_GQL_QueryVars__ContributionsAggregate,
    GH_GQL_Schema__ContributionsAggregate,
} from './query'

interface GH_GQL_RawResponse__ContributionsAggregate extends GH_GQL_RawResponse__BASE {
    data?: {
        viewer: {
            contributionsCollection: GH_GQL_Schema__ContributionsAggregate
        }
    }
}

export interface GH_GQL_Response__ContributionsAggregate extends GH_GQL_Response__BASE {
    contributionsAggregate?: GH_GQL_Schema__ContributionsAggregate
}

export const GH_GQL_Call__ContributionsAggregate = async (
    accessToken: string,
    variables: GH_GQL_QueryVars__ContributionsAggregate,
): Promise<GH_GQL_Response__ContributionsAggregate> => {
    const res = await BASE_GH_GQL_Call__makeQueryWithAuth(accessToken, GH_GQL_Query__ContributionsAggregate, variables)

    const { status, statusText } = res
    if (status !== 200) {
        return { contributionsAggregate: undefined, success: false, error: `error ${status}: ${statusText}` }
    }

    const resJson = (await res.json()) as GH_GQL_RawResponse__ContributionsAggregate

    const { data, errors: queryErrors } = resJson
    if (queryErrors !== undefined || data === undefined) {
        return {
            contributionsAggregate: undefined,
            success: false,
            error: `error: ${queryErrors !== undefined ? queryErrors[0].message : 'unknown (GraphQL)'}`,
        }
    }

    const {
        viewer: { contributionsCollection },
    } = data
    return { success: true, contributionsAggregate: contributionsCollection }
}
