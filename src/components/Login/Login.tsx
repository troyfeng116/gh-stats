'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

import { NEXT_PUBLIC_GH_CLIENT_ID } from '@/client/constants'
import { AuthStatus, useAuth } from '@/components/Auth'

export const Login: React.FC = () => {
    const router = useRouter()
    const { authStatus } = useAuth()

    // https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/generating-a-user-access-token-for-a-github-app
    const scope = 'user repo'
    const loginURL = `https://github.com/login/oauth/authorize?client_id=${NEXT_PUBLIC_GH_CLIENT_ID}&scope=${scope}`

    if (authStatus === AuthStatus.INITIALIZING) {
        return <div></div>
    }

    if (authStatus === AuthStatus.AUTH) {
        router.push('/')
        return <div></div>
    }

    return (
        <div>
            <a href={loginURL}>Click to log in with GitHub</a>
        </div>
    )
}
