'use client'

import React, { createContext, useCallback, useContext, useReducer } from 'react'

import { AUTH_LOGIN_FAILED, AUTH_LOGIN_SUCCESS, AUTH_LOGOUT } from './actions'
import { reducer } from './reducer'

import { getTokenAPI } from '@/client/lib'
import { clearCookies, deleteAccessTokenCookie, setAccessTokenCookie } from '@/client/utils/cookies'

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

    const login = useCallback(async (code: string, callback: (success: boolean, error?: string) => void) => {
        console.log('[AuthProvider] login')

        const tokenResponse = await getTokenAPI(code)
        console.log(tokenResponse)
        const { success, error, accessToken } = tokenResponse
        if (!success || accessToken === undefined) {
            dispatch({ type: AUTH_LOGIN_FAILED })
            deleteAccessTokenCookie()
            callback(false, error)
        } else {
            dispatch({ type: AUTH_LOGIN_SUCCESS, accessToken: accessToken })
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
