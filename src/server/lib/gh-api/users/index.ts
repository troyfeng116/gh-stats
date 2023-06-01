import { BASE_GH_API_Call__getGitHubAPI, GH_API_Response__BASE } from '..'

import { GH_API_Obj__User } from './model'

export interface GH_API_Response__getUser extends GH_API_Response__BASE {
    user?: GH_API_Obj__User
}

export const GH_API_Call__getUser = async (accessToken: string): Promise<GH_API_Response__getUser> => {
    const res = await BASE_GH_API_Call__getGitHubAPI('/user', accessToken)

    const { status, statusText } = res
    // TODO: how to handle caching/304?
    if (status !== 200 && status !== 304) {
        return {
            user: undefined,
            success: false,
            error: `error ${status}: ${statusText}`,
        }
    }

    // console.log(res)
    const resJson = (await res.json()) as GH_API_Obj__User
    // console.log(resJson)

    return {
        user: resJson,
        success: true,
    }
}
