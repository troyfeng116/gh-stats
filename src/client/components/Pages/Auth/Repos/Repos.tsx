'use client'

import React from 'react'
import Link from 'next/link'

import LifetimeStats from './LifetimeStats'

import { useAuth } from '@/client/components/Wrappers/AuthProvider'

export const Repos: React.FC = () => {
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
            <LifetimeStats accessToken={accessToken} />
        </div>
    )
}
