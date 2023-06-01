'use client'

import React from 'react'
import Link from 'next/link'

import LifetimeCommits from '@/client/components/Pages/Auth/Repos/LIfetimeStats'
import { AuthStatus, useAuth } from '@/client/components/Wrappers/AuthProvider'

export const Repos: React.FC = () => {
    const { authStatus, accessToken, logout } = useAuth()

    if (authStatus === AuthStatus.INITIALIZING) {
        return <div></div>
    }

    if (authStatus === AuthStatus.UNAUTH || accessToken === undefined) {
        return (
            <div>
                <Link href="/login">Please login</Link>
            </div>
        )
    }

    return (
        <div>
            <LifetimeCommits accessToken={accessToken} />
            <button onClick={() => logout()}>Log out</button>
        </div>
    )
}
