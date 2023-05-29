import { GetTokenAPIResponse } from '@/models/api'
// import { GH_refreshTokenAPI } from '@/server/lib/gh-auth'

export const POST = async (): Promise<Response> => {
    console.log('/api/refresh-token POST')

    const clientRes: GetTokenAPIResponse = {
        success: false,
        error: '/api/refresh-token has been deprecated',
    }
    return new Response(JSON.stringify(clientRes), {
        status: 503,
    })

    // const body = await request.json()
    // const { refreshToken } = body
    // if (refreshToken === undefined) {
    //     const clientRes: GetOAuthTokenAPIResponse = {
    //         success: false,
    //         error: 'body must include refresh token',
    //     }
    //     return new Response(JSON.stringify(clientRes), {
    //         status: 400,
    //     })
    // }

    // const res = await GH_refreshTokenAPI(refreshToken)
    // const { success, error, accessToken: updatedAccessToken, refreshToken: updatedRefreshToken } = res
    // if (!success || updatedAccessToken === undefined || updatedRefreshToken === undefined) {
    //     return new Response(JSON.stringify(res), {
    //         status: 400,
    //         statusText: error,
    //     })
    // }

    // const cookieStore = cookies()
    // setAccessTokenCookie(cookieStore, updatedAccessToken)
    // setRefreshTokenCookie(cookieStore, updatedRefreshToken)

    // return new Response(JSON.stringify(res), {
    //     status: 200,
    // })
}
