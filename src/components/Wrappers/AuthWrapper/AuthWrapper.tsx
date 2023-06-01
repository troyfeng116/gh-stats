import React, { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'

import { CLIENT_AUTH_ROUTES, CLIENT_UNAUTH_ROUTES } from '@/client/constants'
import { AuthStatus, useAuth } from '@/components/Auth'

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

    const [shouldBlockRender, setShouldBlockRender] = useState<boolean>(true)

    const { authStatus } = useAuth()
    const router = useRouter()
    const pathname = usePathname()

    useEffect(() => {
        if (authStatus === AuthStatus.UNAUTH && !isUnauthAllowedOnRoute(pathname)) {
            setShouldBlockRender(true)
            router.push('/login')
        } else if (authStatus === AuthStatus.AUTH && !isAuthAllowedOnRoute(pathname)) {
            setShouldBlockRender(true)
            router.push('/')
        } else {
            setShouldBlockRender(false)
        }
    }, [authStatus, router, pathname])

    // TODO: loading state
    if (authStatus === AuthStatus.INITIALIZING) {
        return <div>Auth loading...</div>
    }

    if (shouldBlockRender) {
        return null
    }

    return <>{children}</>
}
