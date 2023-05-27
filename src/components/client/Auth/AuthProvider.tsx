import React, { createContext, useContext, useState } from 'react'

import { getTokenAPI } from '@/client/lib'
import { clearCookies, deleteAccessTokenCookie, setAccessTokenCookie } from '@/client/utils/cookies'

export enum AuthState {
    INITIALIZING = 'INITIALIZING',
    UNAUTH = 'UNAUTH',
    AUTH = 'AUTH',
}

export interface AuthContext {
    state: AuthState
    accessToken?: string
    login: (code: string, callback: (success: boolean, error?: string) => void) => Promise<void>
    logout: () => void
}

const initialAuthContext: AuthContext = {
    state: AuthState.INITIALIZING,
    accessToken: undefined,
    login: async () => {
        return
    },
    logout: () => {
        return
    },
}

const authContext = createContext(initialAuthContext)

export const useAuth: () => AuthContext = () => {
    return useContext(authContext)
}

interface AuthProviderProps {
    child: React.ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = (props: AuthProviderProps) => {
    const { child } = props

    const [authState, setAuthState] = useState<AuthState>(AuthState.INITIALIZING)
    const [accessToken, setAccessToken] = useState<string>()

    const login = async (code: string, callback: (success: boolean, error?: string) => void) => {
        console.log('[AuthProvider] login')

        const tokenResponse = await getTokenAPI(code)
        console.log(tokenResponse)
        const { success, error, accessToken } = tokenResponse
        if (!success || accessToken === undefined) {
            setAccessToken(undefined)
            setAuthState(AuthState.UNAUTH)
            deleteAccessTokenCookie()
            callback(false, error)
        } else {
            setAccessToken(accessToken)
            setAuthState(AuthState.AUTH)
            setAccessTokenCookie(accessToken)
            callback(true)
        }
    }

    const logout = () => {
        console.log('[AuthProvider] logout')

        setAuthState(AuthState.UNAUTH)
        setAccessToken(undefined)
        clearCookies()
    }

    return (
        <authContext.Provider
            value={{
                state: authState,
                accessToken: accessToken,
                login: login,
                logout: logout,
            }}
        >
            {child}
        </authContext.Provider>
    )
}
