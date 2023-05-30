import Cookies from 'js-cookie'

import { ACCESS_TOKEN_COOKIE_NAME } from '@/shared/constants'

export const getAccessTokenCookie = (): string | undefined => {
    return Cookies.get(ACCESS_TOKEN_COOKIE_NAME)
}

export const setAccessTokenCookie = (accessToken: string) => {
    Cookies.set(ACCESS_TOKEN_COOKIE_NAME, accessToken, {
        expires: new Date(Date.now() + 6 * 30 * 24 * 60 * 60 * 1000),
    })
}

export const deleteAccessTokenCookie = () => {
    Cookies.remove(ACCESS_TOKEN_COOKIE_NAME)
}

export const clearCookies = () => {
    deleteAccessTokenCookie()
}
