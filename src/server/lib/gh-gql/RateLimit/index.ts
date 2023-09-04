import { BASE_GH_GQL_Call__makeQueryWithAuth, GH_GQL_RawResponse_BASE, GH_GQL_Response__BASE } from '..'

import { GH_GQL_Query__RateLimit, GH_GQL_Schema__RateLimit } from './query'

interface GH_GQL_RawResponse__RateLimit extends GH_GQL_RawResponse_BASE {
    data?: {
        rateLimit: GH_GQL_Schema__RateLimit
    }
}

export interface GH_GQL_Response__RateLimit extends GH_GQL_Response__BASE {
    rateLimit?: GH_GQL_Schema__RateLimit
}

export const GH_GQL_Call__RateLimit = async (accessToken: string): Promise<GH_GQL_Response__RateLimit> => {
    const res = await BASE_GH_GQL_Call__makeQueryWithAuth(accessToken, GH_GQL_Query__RateLimit)
    const { status, statusText } = res

    if (status !== 200) {
        return { rateLimit: undefined, success: false, error: `error ${status}: ${statusText}` }
    }

    const resJson = (await res.json()) as GH_GQL_RawResponse__RateLimit
    console.log(resJson)
    const { data, errors: queryErrors } = resJson

    if (data === undefined || queryErrors !== undefined) {
        return {
            rateLimit: undefined,
            success: false,
            error: `error: ${queryErrors !== undefined ? queryErrors[0].message : 'unknown (GraphQL)'}`,
        }
    }

    const { rateLimit } = data
    return { rateLimit: rateLimit, success: true }
}
