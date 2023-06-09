import { cookies } from 'next/headers'

import { SERVICE_Call__exchangeCodeForAccessToken } from '@/server/services/getToken'
import { setAccessTokenCookie } from '@/server/utils/serverCookies'
import { SHARED_APIFields__GetToken } from '@/shared/models'

export const POST = async (request: Request): Promise<Response> => {
    console.log('POST /api/get-token')

    // https://developer.mozilla.org/en-US/docs/Web/API/Request/json
    const body = await request.json()
    const { code } = body

    if (code === undefined) {
        const clientRes: SHARED_APIFields__GetToken = {
            success: false,
            error: 'body must include client code',
        }
        return new Response(JSON.stringify(clientRes), {
            status: 400,
        })
    }

    const res = await SERVICE_Call__exchangeCodeForAccessToken(code)
    const { success, error, accessToken } = res
    if (!success || accessToken === undefined) {
        return new Response(JSON.stringify(res), {
            status: 400,
            statusText: error,
        })
    }

    const cookieStore = cookies()
    setAccessTokenCookie(cookieStore, accessToken)

    return new Response(JSON.stringify(res), {
        status: 200,
    })
}
