import styles from './Nav.module.css'

import React from 'react'
import Link from 'next/link'

import Button from '../../Reuse/Button'

import { AuthStatus, useAuth } from '@/client/components/Wrappers/AuthProvider'
import { NAV_AUTH_ROUTES, NAV_UNAUTH_ROUTES } from '@/client/routes'

export const Nav: React.FC = () => {
    const { authStatus, logout } = useAuth()

    if (authStatus === AuthStatus.INITIALIZING) {
        return <nav className={styles.nav}></nav>
    }

    if (authStatus === AuthStatus.AUTH) {
        return (
            <nav className={styles.nav}>
                <div>
                    {NAV_AUTH_ROUTES.map(({ href, label }, idx) => (
                        <Link key={idx} href={href} className={styles.nav_link}>
                            {label}
                        </Link>
                    ))}
                </div>
                <Button onClick={logout}>Log out</Button>
            </nav>
        )
    }

    return (
        <nav className={styles.nav}>
            <div>
                {NAV_UNAUTH_ROUTES.map(({ href, label }, idx) => (
                    <Link key={idx} href={href} className={styles.nav_link}>
                        {label}
                    </Link>
                ))}
            </div>
        </nav>
    )
}
