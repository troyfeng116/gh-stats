import React, { createContext, useCallback, useContext, useEffect, useReducer } from 'react'

import {
    AUTH_COOKIE_VALIDATED,
    AUTH_LOADING,
    AUTH_LOGIN_FAILED,
    AUTH_LOGIN_SUCCESS,
    AUTH_LOGOUT,
    AUTH_NO_COOKIE,
} from './actions'
import { reducer } from './reducer'

import { getTokenAPI, validateTokenAPI } from '@/client/lib/unauthAPI'
import {
    clearCookies,
    deleteAccessTokenCookie,
    getAccessTokenCookie,
    setAccessTokenCookie,
} from '@/client/utils/cookies'

export enum AuthStatus {
    INITIALIZING = 'INITIALIZING',
    UNAUTH = 'UNAUTH',
    AUTH = 'AUTH',
}

export interface AuthContext {
    authStatus: AuthStatus
    accessToken?: string
    login: (code: string, callback: (success: boolean, error?: string) => void) => Promise<void>
    logout: () => void
}

const initialAuthContext: AuthContext = {
    authStatus: AuthStatus.INITIALIZING,
    accessToken: undefined,
    login: async () => {
        return
    },
    logout: () => {
        return
    },
}

const authContext = createContext(initialAuthContext)

export const useAuth = (): AuthContext => {
    return useContext(authContext)
}

export interface AuthState {
    authStatus: AuthStatus
    accessToken?: string
}

interface AuthProviderProps {
    children: React.ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = (props: AuthProviderProps) => {
    const { children } = props

    const [state, dispatch] = useReducer(reducer, {
        authStatus: AuthStatus.INITIALIZING,
        accessToken: undefined,
    })
    const { authStatus, accessToken } = state

    useEffect(() => {
        const attemptToValidateCookies = async () => {
            dispatch({ type: AUTH_LOADING })

            // TODO: merge into single getTokens
            const accessToken = getAccessTokenCookie()
            if (accessToken === undefined) {
                dispatch({ type: AUTH_NO_COOKIE })
                return
            }

            const validateResponse = await validateTokenAPI(accessToken)
            const { success: validateSuccess, error: validateError } = validateResponse
            if (validateSuccess) {
                dispatch({ type: AUTH_COOKIE_VALIDATED, accessToken: accessToken })
                return
            }

            console.log(validateError)
            dispatch({ type: AUTH_LOGIN_FAILED })
        }

        attemptToValidateCookies()
    }, [])

    useEffect(() => {
        console.log(`[AuthProvider] ${authStatus}`)
    }, [authStatus])

    const login = useCallback(async (code: string, callback: (success: boolean, error?: string) => void) => {
        console.log('[AuthProvider] login')

        // dispatch({ type: AUTH_LOADING })
        const tokenResponse = await getTokenAPI(code)
        console.log(tokenResponse)
        const { success, error, accessToken } = tokenResponse
        if (!success || accessToken === undefined) {
            dispatch({ type: AUTH_LOGIN_FAILED })
            deleteAccessTokenCookie()
            callback(false, error)
        } else {
            dispatch({ type: AUTH_LOGIN_SUCCESS, accessToken: accessToken })
            // TODO: this is handled from the server?
            setAccessTokenCookie(accessToken)
            callback(true)
        }
    }, [])

    const logout = useCallback(() => {
        console.log('[AuthProvider] logout')

        dispatch({ type: AUTH_LOGOUT })
        clearCookies()
    }, [])

    return (
        <authContext.Provider
            value={{
                authStatus: authStatus,
                accessToken: accessToken,
                login: login,
                logout: logout,
            }}
        >
            {children}
        </authContext.Provider>
    )
}
