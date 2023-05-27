import Cookies from 'js-cookie'

export const getAccessTokenCookie = (): string | undefined => {
    return Cookies.get('access_token')
}

export const setAccessTokenCookie = (accessToken: string) => {
    Cookies.set('access_token', accessToken)
}

export const deleteAccessTokenCookie = () => {
    Cookies.remove('access_token')
}

export const getRefreshTokenCookie = (): string | undefined => {
    return Cookies.get('refresh_token')
}

export const setRefreshTokenCookie = (refreshToken: string) => {
    Cookies.set('refresh_token', refreshToken)
}

export const deleteRefreshTokenCookie = () => {
    Cookies.remove('refresh_token')
}

export const clearCookies = () => {
    deleteAccessTokenCookie()
    deleteRefreshTokenCookie()
}
