import { queryGitHubGraphQL_API } from '..'

import { GH_GQL_GetUserResponse, GH_GQL_GetViewerResponse, GH_GQL_UserSchema } from './model'
import { GH_GQL_getUserQueryVariables } from './query'

export const GH_GQL_getViewer = async (
    accessToken: string,
    query: string,
): Promise<{ success: boolean; error?: string; user?: GH_GQL_UserSchema }> => {
    const res = await queryGitHubGraphQL_API(accessToken, query)
    const { status, statusText } = res

    if (status !== 200) {
        return { user: undefined, success: false, error: `error ${status}: ${statusText}` }
    }

    const resJson = (await res.json()) as GH_GQL_GetViewerResponse
    console.log(resJson)
    const { data, errors: queryErrors } = resJson

    if (data === undefined || queryErrors !== undefined) {
        return {
            user: undefined,
            success: false,
            error: `error: ${queryErrors !== undefined ? queryErrors[0].message : 'unknown (GraphQL)'}`,
        }
    }

    const { viewer } = data
    return { user: viewer, success: true }
}

export const GH_GQL_getUser = async (
    accessToken: string,
    query: string,
    variables: GH_GQL_getUserQueryVariables,
): Promise<{ success: boolean; error?: string; user?: GH_GQL_UserSchema }> => {
    const res = await queryGitHubGraphQL_API(accessToken, query, variables)
    const { status, statusText } = res

    if (status !== 200) {
        return { user: undefined, success: false, error: `error ${status}: ${statusText}` }
    }

    const resJson = (await res.json()) as GH_GQL_GetUserResponse
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
