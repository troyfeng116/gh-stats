import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies'

import { ACCESS_TOKEN_COOKIE_NAME, REFRESH_TOKEN_COOKIE_NAME } from '@/shared/constants'

export const getAccessTokenCookie = (cookies: ReadonlyRequestCookies): string | undefined => {
    const cookie = cookies.get(ACCESS_TOKEN_COOKIE_NAME)

    if (cookie === undefined) {
        return undefined
    }

    return cookie.value
}

export const setAccessTokenCookie = (cookies: ReadonlyRequestCookies, accessToken: string) => {
    cookies.set(ACCESS_TOKEN_COOKIE_NAME, accessToken)
}

export const getRefreshTokenCookie = (cookies: ReadonlyRequestCookies): string | undefined => {
    const cookie = cookies.get(REFRESH_TOKEN_COOKIE_NAME)

    if (cookie === undefined) {
        return undefined
    }

    return cookie.value
}

export const setRefreshTokenCookie = (cookies: ReadonlyRequestCookies, refreshToken: string) => {
    cookies.set(REFRESH_TOKEN_COOKIE_NAME, refreshToken)
}
