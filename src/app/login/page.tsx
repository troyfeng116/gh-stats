import React from 'react'

import Login from '@/components/client/Login'
import { VERSION_NUMBER } from '@/config/constants'

export default async function LoginPage() {
    // async function loginCheck(): Promise<boolean> {
    //     'use server'

    //     const cookieStore = cookies()
    //     console.log(cookieStore)
    //     const refreshTokenCookie = getRefreshTokenCookie(cookieStore)
    //     if (refreshTokenCookie === undefined) {
    //         return false
    //     }

    //     const { success, error, accessToken, refreshToken } = await GH_refreshTokenAPI(refreshTokenCookie)
    //     if (!success || error !== undefined || accessToken === undefined || refreshToken === undefined) {
    //         return false
    //     }

    //     setAccessTokenCookie(cookieStore, accessToken)
    //     setRefreshTokenCookie(cookieStore, refreshToken)
    //     return true
    // }
    // if (await loginCheck()) {
    //     NextResponse.redirect('/')
    // }

    return (
        <main>
            <Login />
            <p>{VERSION_NUMBER}</p>
        </main>
    )
}
