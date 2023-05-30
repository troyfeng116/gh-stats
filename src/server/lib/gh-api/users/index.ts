import { getGitHubAPI } from '..'

import { GH_API_User } from './model'

export const GH_API_getUser = async (
    accessToken: string,
): Promise<{ success: boolean; error?: string; user?: GH_API_User }> => {
    const res = await getGitHubAPI('/user', accessToken)

    const { status, statusText } = res
    // TODO: how to handle 304?
    if (status !== 200 && status !== 304) {
        return {
            user: undefined,
            success: false,
            error: `error ${status}: ${statusText}`,
        }
    }

    const resJson = (await res.json()) as GH_API_User
    // console.log(resJson)

    return {
        user: resJson,
        success: true,
    }
}
