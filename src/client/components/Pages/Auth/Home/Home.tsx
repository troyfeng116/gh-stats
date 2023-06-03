'use client'

import React from 'react'
import Link from 'next/link'

import UserCard from '@/client/components/Pages/Auth/Home/UserCard'
import { useAuth } from '@/client/components/Wrappers/AuthProvider'

export const Home: React.FC = () => {
    const { accessToken } = useAuth()

    if (accessToken === undefined) {
        return (
            <div>
                <Link href="/login">Please login</Link>
            </div>
        )
    }

    return (
        <div>
            <UserCard accessToken={accessToken} />
        </div>
    )
}
