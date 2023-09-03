import React, { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'

import { AuthStatus, useAuth } from '@/client/components/Wrappers/AuthProvider'
import { rateLimitAPI } from '@/client/lib/authAPI'
import { CLIENT_AUTH_ROUTES, CLIENT_UNAUTH_ROUTES } from '@/client/routes'

/*
Handles client-side authentication redirects by comparing current route against auth/unauth routes
Must be descendent of `AuthProvider`
*/

interface AuthWrapperProps {
    children: React.ReactNode
}

enum RateLimitState {
    INITIALIZING = 'INITIALIZING',
    OK = 'OK',
    LIMITED = 'LIMITED',
}

const isAuthAllowedOnRoute = (pathname: string): boolean => {
    return CLIENT_AUTH_ROUTES.includes(pathname)
}

const isUnauthAllowedOnRoute = (pathname: string): boolean => {
    return CLIENT_UNAUTH_ROUTES.includes(pathname)
}

export const AuthWrapper: React.FC<AuthWrapperProps> = (props) => {
    const { children } = props

    const { authStatus, accessToken } = useAuth()
    const router = useRouter()
    const pathname = usePathname()

    const [rateLimitState, setRateLimitState] = useState<RateLimitState>(RateLimitState.INITIALIZING)

    useEffect(() => {
        const getRateLimit = async (accessToken: string) => {
            const { success: rateLimitSuccess, error: rateLimitError, rateLimit } = await rateLimitAPI(accessToken)
            if (!rateLimitSuccess || rateLimit === undefined) {
                console.error(rateLimitError)
                return setRateLimitState(RateLimitState.LIMITED)
            }

            console.log(rateLimit)
            const { limit, used, remaining } = rateLimit
            setRateLimitState(remaining <= 4996 ? RateLimitState.LIMITED : RateLimitState.OK)
        }

        if (authStatus === AuthStatus.UNAUTH && !isUnauthAllowedOnRoute(pathname)) {
            router.push('/login')
        } else if (authStatus === AuthStatus.AUTH && !isAuthAllowedOnRoute(pathname)) {
            router.push('/')
        } else if (authStatus === AuthStatus.AUTH && accessToken !== undefined) {
            getRateLimit(accessToken)
        } else {
            setRateLimitState(RateLimitState.OK)
        }
    }, [router, pathname, authStatus, accessToken])

    // TODO: loading state
    // remember this is immediately returned from server before hydration
    if (authStatus === AuthStatus.INITIALIZING) {
        return <div>Auth loading...</div>
    }

    if (authStatus === AuthStatus.UNAUTH && !isUnauthAllowedOnRoute(pathname)) {
        return null
    }

    if (authStatus === AuthStatus.AUTH && !isAuthAllowedOnRoute(pathname)) {
        return null
    }

    console.log(`[AuthWrapper] rendering ${pathname} with ${authStatus}`)

    if (rateLimitState === RateLimitState.INITIALIZING) {
        return <div>Checking rate limits...</div>
    }

    if (rateLimitState === RateLimitState.LIMITED) {
        return <div>Rate limited!</div>
    }

    return <>{children}</>
}
