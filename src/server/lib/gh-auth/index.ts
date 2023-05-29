import { GetTokenAPIResponse } from '@/models/api'
import {
    GH_OAuthAccessTokenAPIError,
    GH_OAuthAccessTokenAPIResponse,
    GH_OAuthAccessTokenAPISuccess,
    GH_UserAPI as GH_GetUserAPI,
} from '@/models/gh'
import { GH_CLIENT_ID, GH_CLIENT_SECRET } from '@/server/constants'

const processTokenRes = (resJson: GH_OAuthAccessTokenAPIResponse): GetTokenAPIResponse => {
    const { error: unknownError, access_token: unknownAccessToken } = resJson
    if (unknownError !== undefined || unknownAccessToken === undefined) {
        // type cast
        const ghResJson = resJson as GH_OAuthAccessTokenAPIError
        const { error, error_description } = ghResJson
        return {
            success: false,
            error: `${error}: ${error_description}`,
        }
    }

    const ghResJson = resJson as GH_OAuthAccessTokenAPISuccess
    const { access_token } = ghResJson
    return {
        success: true,
        accessToken: access_token,
    }
}

export const GH_getTokenWithClientCodeAPI = async (code: string): Promise<GetTokenAPIResponse> => {
    const payload = {
        code: code,
        client_id: GH_CLIENT_ID,
        client_secret: GH_CLIENT_SECRET,
    }
    console.log(payload)

    const res = await fetch('https://github.com/login/oauth/access_token', {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
    })

    const resJson = (await res.json()) as GH_OAuthAccessTokenAPIResponse
    console.log(resJson)

    return processTokenRes(resJson)
}

export const GH_getUserAPI = async (accessToken: string): Promise<GH_GetUserAPI | undefined> => {
    const res = await fetch('https://api.github.com/user', {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    })

    const { status } = res
    if (status !== 200 && status !== 304) {
        return undefined
    }

    const resJson = (await res.json()) as GH_GetUserAPI
    console.log(resJson)

    return resJson
}
