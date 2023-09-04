'use client'

import styles from './Login.module.css'

import React from 'react'
import { FaGithub } from 'react-icons/fa'

import Button from '@/client/components/Reuse/Button'
import { NEXT_PUBLIC_GH_CLIENT_ID } from '@/client/constants'

export const Login: React.FC = () => {
    // TODO: redirect_uri?
    // https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps
    const scope = 'user repo'
    const loginURL = `https://github.com/login/oauth/authorize?client_id=${NEXT_PUBLIC_GH_CLIENT_ID}&scope=${scope}`

    return (
        <div>
            <Button>
                <a className={styles.login_btn} href={loginURL}>
                    <FaGithub size={24} style={{ marginRight: 9 }} /> Log in with GitHub
                </a>
            </Button>
        </div>
    )
}
