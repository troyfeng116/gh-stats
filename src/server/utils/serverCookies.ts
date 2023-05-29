import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies'

import { ACCESS_TOKEN_COOKIE_NAME } from '@/shared/constants'

export const setAccessTokenCookie = (cookies: ReadonlyRequestCookies, accessToken: string) => {
    cookies.set(ACCESS_TOKEN_COOKIE_NAME, accessToken)
}
