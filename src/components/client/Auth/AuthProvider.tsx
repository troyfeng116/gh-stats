'use client'

import React, { createContext, useCallback, useContext, useEffect, useReducer } from 'react'

import { AUTH_COOKIE_VALIDATED, AUTH_LOGIN_FAILED, AUTH_LOGIN_SUCCESS, AUTH_LOGOUT, AUTH_NO_COOKIE } from './actions'
import { reducer } from './reducer'

import { getTokenAPI } from '@/client/lib'
import { clearCookies, deleteAccessTokenCookie, getAccessTokenCookie } from '@/client/utils/cookies'

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
        const accessToken = getAccessTokenCookie()
        if (accessToken === undefined) {
            dispatch({ type: AUTH_NO_COOKIE })
            return
        }

        // TODO: validate token, else refresh?
        dispatch({ type: AUTH_COOKIE_VALIDATED, accessToken: accessToken })
    }, [])

    useEffect(() => {
        console.log(authStatus)
    }, [authStatus])

    const login = useCallback(async (code: string, callback: (success: boolean, error?: string) => void) => {
        console.log('[AuthProvider] login')

        const tokenResponse = await getTokenAPI(code)
        console.log(tokenResponse)
        const { success, error, accessToken, refreshToken } = tokenResponse
        if (!success || accessToken === undefined || refreshToken === undefined) {
            dispatch({ type: AUTH_LOGIN_FAILED })
            deleteAccessTokenCookie()
            callback(false, error)
        } else {
            dispatch({ type: AUTH_LOGIN_SUCCESS, accessToken: accessToken })
            // setAccessTokenCookie(accessToken)
            // setRefreshTokenCookie(refreshToken)
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
