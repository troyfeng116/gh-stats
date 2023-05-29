import {
    AUTH_COOKIE_VALIDATED,
    AUTH_LOGIN_FAILED,
    AUTH_LOGIN_START,
    AUTH_LOGIN_SUCCESS,
    AUTH_LOGOUT,
    AUTH_NO_COOKIE,
    AuthAction,
} from './actions'
import { AuthState, AuthStatus } from './AuthProvider'

export const reducer = (state: AuthState, action: AuthAction): AuthState => {
    switch (action.type) {
        case AUTH_LOGIN_START:
            return { ...state }
        case AUTH_NO_COOKIE:
        case AUTH_LOGIN_FAILED:
        case AUTH_LOGOUT:
            return { authStatus: AuthStatus.UNAUTH, accessToken: undefined }
        case AUTH_COOKIE_VALIDATED:
        case AUTH_LOGIN_SUCCESS:
            return { authStatus: AuthStatus.AUTH, accessToken: action.accessToken }
    }
}
