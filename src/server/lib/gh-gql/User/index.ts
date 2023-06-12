import { BASE_GH_GQL_Call__makeQueryWithAuth, GH_GQL_RawResponse_BASE, GH_GQL_Response__BASE } from '..'

import { GH_GQL_Query__User, GH_GQL_QueryVars__getUser, GH_GQL_Schema__User } from './query'

interface GH_GQL_RawResponse__User extends GH_GQL_RawResponse_BASE {
    data?: {
        user: GH_GQL_Schema__User
    }
}

export interface GH_GQL_Response__User extends GH_GQL_Response__BASE {
    user?: GH_GQL_Schema__User
}

export const GH_GQL_Call__User = async (
    accessToken: string,
    variables: GH_GQL_QueryVars__getUser,
): Promise<GH_GQL_Response__User> => {
    const res = await BASE_GH_GQL_Call__makeQueryWithAuth(accessToken, GH_GQL_Query__User, variables)
    const { status, statusText } = res

    if (status !== 200) {
        return { user: undefined, success: false, error: `error ${status}: ${statusText}` }
    }

    const resJson = (await res.json()) as GH_GQL_RawResponse__User
    console.log(resJson)
    const { data, errors: queryErrors } = resJson

    if (data === undefined || queryErrors !== undefined) {
        return {
            user: undefined,
            success: false,
            error: `error: ${queryErrors !== undefined ? queryErrors[0].message : 'unknown (GraphQL)'}`,
        }
    }

    const { user } = data
    return { user: user, success: true }
}
