export const AUTH_LOGIN_START = 'AUTH_LOGIN_START'
export const AUTH_LOGIN_FAILED = 'AUTH_LOGIN_FAILED'
export const AUTH_LOGIN_SUCCESS = 'AUTH_LOGIN_SUCCESS'

export const AUTH_LOGOUT = 'AUTH_LOGOUT'

interface AuthLoginStart {
    type: typeof AUTH_LOGIN_START
}

interface AuthLoginFailed {
    type: typeof AUTH_LOGIN_FAILED
}

interface AuthLoginSuccess {
    type: typeof AUTH_LOGIN_SUCCESS
    accessToken: string
}

interface AuthLogout {
    type: typeof AUTH_LOGOUT
}

export type AuthAction = AuthLoginStart | AuthLoginFailed | AuthLoginSuccess | AuthLogout
