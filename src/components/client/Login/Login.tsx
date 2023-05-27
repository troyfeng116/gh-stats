'use client'

import React from 'react'

import { NEXT_PUBLIC_GH_CLIENT_ID } from '@/client/constants'

export const Login: React.FC = () => {
    const loginURL = `https://github.com/login/oauth/authorize?client_id=${NEXT_PUBLIC_GH_CLIENT_ID}`

    return (
        <div>
            <a href={loginURL}>Click to log in with GitHub</a>
        </div>
    )
}
