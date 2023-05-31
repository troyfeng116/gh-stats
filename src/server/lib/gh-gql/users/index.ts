import { queryGitHubGraphQL_API } from '..'

import { GH_GQL_User } from './model'

export const GH_GQL_getUser = async (
    accessToken: string,
    query: {
        query: string
        variables?: object
    },
): Promise<{ success: boolean; error?: string; user?: GH_GQL_User }> => {
    const res = await queryGitHubGraphQL_API(accessToken, query)
    const { status, statusText } = res

    if (status !== 200) {
        return { user: undefined, success: false, error: `error ${status}: ${statusText}` }
    }

    const resJson = (await res.json()) as { data?: { user: GH_GQL_User }; error?: { message: string }[] }
    console.log(resJson)
    const { data, error: queryErrors } = resJson

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
