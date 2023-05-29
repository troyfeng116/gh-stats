'use client'

import React from 'react'
import Link from 'next/link'

import { AuthStatus, useAuth } from '@/components/client/Auth'
import UserCard from '@/components/client/UserCard'

export const Home: React.FC = () => {
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
            <UserCard accessToken={accessToken} />
            <button onClick={() => logout()}>Log out</button>
        </div>
    )
}
