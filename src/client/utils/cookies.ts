import Cookies from 'js-cookie'

import { ACCESS_TOKEN_COOKIE_NAME, REFRESH_TOKEN_COOKIE_NAME } from '@/shared/constants'

export const getAccessTokenCookie = (): string | undefined => {
    return Cookies.get(ACCESS_TOKEN_COOKIE_NAME)
}

export const setAccessTokenCookie = (accessToken: string) => {
    Cookies.set(ACCESS_TOKEN_COOKIE_NAME, accessToken)
}

export const deleteAccessTokenCookie = () => {
    Cookies.remove(ACCESS_TOKEN_COOKIE_NAME)
}

export const getRefreshTokenCookie = (): string | undefined => {
    return Cookies.get(REFRESH_TOKEN_COOKIE_NAME)
}

export const setRefreshTokenCookie = (refreshToken: string) => {
    Cookies.set(REFRESH_TOKEN_COOKIE_NAME, refreshToken)
}

export const deleteRefreshTokenCookie = () => {
    Cookies.remove(REFRESH_TOKEN_COOKIE_NAME)
}

export const clearCookies = () => {
    deleteAccessTokenCookie()
    deleteRefreshTokenCookie()
}
