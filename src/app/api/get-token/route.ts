import { cookies } from 'next/headers'

import { GetTokenAPIResponse } from '@/models/api'
import { GH_getTokenWithClientCodeAPI } from '@/server/lib/gh-auth'
import { setAccessTokenCookie, setRefreshTokenCookie } from '@/server/utils/checkAuth'

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

    const res = await GH_getTokenWithClientCodeAPI(code)
    const { success, error, accessToken, refreshToken } = res
    if (!success || accessToken === undefined || refreshToken === undefined) {
        return new Response(JSON.stringify(res), {
            status: 400,
            statusText: error,
        })
    }

    const cookieStore = cookies()
    setAccessTokenCookie(cookieStore, accessToken)
    setRefreshTokenCookie(cookieStore, refreshToken)

    return new Response(JSON.stringify(res), {
        status: 200,
    })
}
