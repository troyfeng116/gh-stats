'use client'

import styles from './Login.module.css'

import React, { useState } from 'react'
import { FaGithub } from 'react-icons/fa'

import Button from '@/client/components/Reuse/Button'
import { NEXT_PUBLIC_GH_CLIENT_ID } from '@/client/constants'

export const Login: React.FC = () => {
    // TODO: redirect_uri?
    // https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps
    const scope = 'user repo'
    const loginURL = `https://github.com/login/oauth/authorize?client_id=${NEXT_PUBLIC_GH_CLIENT_ID}&scope=${scope}`

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const onClick = () => {
        setIsLoading(true)
        window.location.href = loginURL
    }

    return (
        <div>
            <Button onClick={onClick} disabled={isLoading}>
                <div className={styles.login_btn}>
                    <FaGithub size={24} style={{ marginRight: 9 }} /> Log in with GitHub
                </div>
            </Button>
        </div>
    )
}
