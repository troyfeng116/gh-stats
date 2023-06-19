'use client'

import React from 'react'

import { NEXT_PUBLIC_GH_CLIENT_ID } from '@/client/constants'

export const Login: React.FC = () => {
    // TODO: redirect_uri?
    // https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps
    const scope = 'user repo'
    const loginURL = `https://github.com/login/oauth/authorize?client_id=${NEXT_PUBLIC_GH_CLIENT_ID}&scope=${scope}`

    return (
        <div>
            <a href={loginURL}>Click to log in with GitHub</a>
        </div>
    )
}
