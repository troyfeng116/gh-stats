import { GH_CLIENT_ID, GH_CLIENT_SECRET } from '@/server/constants'

// https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps#2-users-are-redirected-back-to-your-site-by-github
export interface GH_OAuthAccessTokenAPISuccess {
    access_token: string
    token_type: string
    scope: string
}

// https://docs.github.com/en/apps/oauth-apps/maintaining-oauth-apps/troubleshooting-oauth-app-access-token-request-errors#bad-verification-code
export interface GH_OAuthAccessTokenAPIError {
    error: string
    error_description: string
    error_uri: string
}

export type GH_OAuthAccessTokenAPIResponse = Partial<GH_OAuthAccessTokenAPISuccess> &
    Partial<GH_OAuthAccessTokenAPIError>

const processTokenRes = (
    resJson: GH_OAuthAccessTokenAPIResponse,
): { success: boolean; error?: string; access_token?: string } => {
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
        access_token: access_token,
    }
}

export const GH_OAuth_ExchangeClientCodeForAccessTokenAPI = async (
    code: string,
): Promise<{ success: boolean; error?: string; access_token?: string }> => {
    const payload = {
        code: code,
        client_id: GH_CLIENT_ID,
        client_secret: GH_CLIENT_SECRET,
    }
    console.log(payload)

    // note this is NOT an api.github.com endpoint
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
