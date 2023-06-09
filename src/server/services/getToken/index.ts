import { GH_OAuth_Call__ExchangeClientCodeForAccessToken } from '@/server/lib/gh-oauth/access_token'
import { SHARED_APIFields__GetToken } from '@/shared/models'

export const SERVICE_Call__exchangeCodeForAccessToken = async (code: string): Promise<SHARED_APIFields__GetToken> => {
    const { success, error, access_token } = await GH_OAuth_Call__ExchangeClientCodeForAccessToken(code)
    return { success: success, error: error, accessToken: access_token }
}
