import React, { useEffect, useReducer, useState } from 'react'
import { usePathname } from 'next/navigation'

import { AuthStatus, useAuth } from '../AuthProvider'

import { RATE_LIMIT_AUTH_ERROR, RATE_LIMIT_AUTH_RESPONSE, RATE_LIMIT_LOADING, RATE_LIMIT_UNAUTH } from './actions'
import { reducer } from './reducer'

import { rateLimitAPI } from '@/client/lib/authAPI'
import { SHARED_Model__RateLimitClientInfo } from '@/shared/models/models/RateLimit'

/*
Should only be rendered after client-side auth redirects in AuthWrapper
*/

interface RateLimitWrapperProps {
    children: React.ReactNode
}

export interface RateLimitWrapperState {
    isLoading: boolean
    error?: string
    rateLimitInfo?: SHARED_Model__RateLimitClientInfo
}

const initialRateLimitWrapperState: RateLimitWrapperState = {
    isLoading: true,
    error: undefined,
    rateLimitInfo: undefined,
}

export const RateLimitWrapper: React.FC<RateLimitWrapperProps> = (props) => {
    const { children } = props

    const [state, dispatch] = useReducer(reducer, initialRateLimitWrapperState)
    const { isLoading, error, rateLimitInfo } = state

    const { authStatus, accessToken } = useAuth()
    const pathname = usePathname()
    // additional state needed: do not render new pathname until rate limits have been polled
    // race condition: if previously set rateLimit to !undefined, before dispatch(LOADING) updates, allows child render, then sets to loading
    // -> makes page query and rate limit query
    const [lastPathname, setPrevPathname] = useState<string>(pathname)

    useEffect(() => {
        const getRateLimit = async (accessToken: string) => {
            dispatch({ type: RATE_LIMIT_LOADING })
            const {
                success: rateLimitSuccess,
                error: rateLimitError,
                rateLimitClientInfo: updatedRateLimit,
            } = await rateLimitAPI(accessToken)

            if (!rateLimitSuccess || updatedRateLimit === undefined) {
                dispatch({ type: RATE_LIMIT_AUTH_ERROR, error: rateLimitError })
            } else {
                dispatch({ type: RATE_LIMIT_AUTH_RESPONSE, rateLimit: updatedRateLimit })
            }

            setPrevPathname(pathname)
        }

        if (authStatus !== AuthStatus.AUTH) {
            dispatch({ type: RATE_LIMIT_UNAUTH })
        } else if (authStatus === AuthStatus.AUTH && accessToken !== undefined) {
            getRateLimit(accessToken)
        }
    }, [authStatus, accessToken, pathname])

    // TODO: handle this upstream? (only render RateLimitWrapper under AUTH in ClientWrappers/AuthWrapper?)
    if (authStatus !== AuthStatus.AUTH) {
        return <>{children}</>
    }

    // prevent state update dispatch race condition
    if (isLoading || pathname !== lastPathname) {
        return <div>Checking rate limits...</div>
    }

    if (rateLimitInfo === undefined) {
        return <div>Rate limit error: {error}</div>
    }

    const { isRateLimited, rateLimitedMessage, rateOkMessage } = rateLimitInfo

    if (isRateLimited) {
        return <div>{rateLimitedMessage}</div>
    }

    console.log(`[RateLimitWrapper] rendering ${pathname}; ${rateOkMessage}`)
    return <>{children}</>
}
