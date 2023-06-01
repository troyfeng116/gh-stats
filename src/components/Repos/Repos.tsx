'use client'

import React from 'react'
import Link from 'next/link'

import { AuthStatus, useAuth } from '@/components/Auth'
import LifetimeCommits from '@/components/LIfetimeStats'

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
