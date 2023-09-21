import React, { useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'

import { AuthStatus, useAuth } from '@/client/components/Wrappers/AuthProvider'
import { CLIENT_AUTH_ROUTES, CLIENT_UNAUTH_ROUTES } from '@/client/routes'

/*
Handles client-side authentication redirects by comparing current route against auth/unauth routes
Must be descendent of `AuthProvider`
*/

interface AuthWrapperProps {
    children: React.ReactNode
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

    useEffect(() => {
        if (authStatus === AuthStatus.UNAUTH && !isUnauthAllowedOnRoute(pathname)) {
            router.push('/login')
        } else if (authStatus === AuthStatus.AUTH && !isAuthAllowedOnRoute(pathname)) {
            router.push('/')
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

    return <>{children}</>
}
