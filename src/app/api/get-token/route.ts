import { GetTokenAPIResponse } from '@/models/api'
import { GH_OAuthAccessTokenAPIError, GH_OAuthAccessTokenAPISuccess } from '@/models/gh'
import { GH_CLIENT_ID, GH_CLIENT_SECRET } from '@/server/constants'

export const POST = async (request: Request): Promise<Response> => {
    console.log('/api/get-token POST')

    // https://developer.mozilla.org/en-US/docs/Web/API/Request/json
    const body = await request.json()
    const { code } = body

    if (code === undefined) {
        const clientRes: GetTokenAPIResponse = {
            success: false,
            error: 'body must include client code',
        }
        return new Response(JSON.stringify(clientRes), {
            status: 400,
        })
    }

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

    const resJson = await res.json()
    console.log(resJson)

    const { error: unknownError, access_token: unknownAccessToken } = resJson
    if (unknownError !== undefined || unknownAccessToken === undefined) {
        // type cast
        const ghResJson = resJson as GH_OAuthAccessTokenAPIError
        const { error, error_description } = ghResJson
        const clientRes: GetTokenAPIResponse = {
            success: false,
            error: `${error}: ${error_description}`,
        }
        return new Response(JSON.stringify(clientRes), {
            status: 400,
        })
    }

    const ghResJson = resJson as GH_OAuthAccessTokenAPISuccess
    const { access_token, refresh_token } = ghResJson

    const clientRes: GetTokenAPIResponse = {
        success: true,
        accessToken: access_token,
        refreshToken: refresh_token,
    }

    return new Response(JSON.stringify(clientRes), {
        status: 200,
    })
}
