import { GetTokenAPIResponse } from '@/models/api'
import { GH_OAuthAccessTokenAPIError, GH_OAuthAccessTokenAPISuccess } from '@/models/gh'
import { GH_CLIENT_ID, GH_CLIENT_SECRET } from '@/server/constants'

export const GH_refreshTokenAPI = async (refreshToken: string): Promise<GetTokenAPIResponse> => {
    const payload = {
        refresh_token: refreshToken,
        grant_type: 'refresh_token',
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

    const resJson = await res.json()
    console.log(resJson)

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
    const { access_token: updatedAccessToken, refresh_token: updatedRefreshToken } = ghResJson

    return {
        success: true,
        accessToken: updatedAccessToken,
        refreshToken: updatedRefreshToken,
    }
}
