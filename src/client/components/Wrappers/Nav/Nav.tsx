import styles from './Nav.module.css'

import React from 'react'
import Link from 'next/link'

import Button from '@/client/components/Reuse/Button'
import { Logo } from '@/client/components/Reuse/Logo/Logo'
import { AuthStatus, useAuth } from '@/client/components/Wrappers/AuthProvider'
import { NAV_AUTH_ROUTES, NAV_UNAUTH_ROUTES } from '@/client/routes'

export const Nav: React.FC = () => {
    const { authStatus, logout } = useAuth()

    let navLeft: React.ReactElement | null = null
    let navRight: React.ReactElement | null = null
    if (authStatus === AuthStatus.UNAUTH) {
        navLeft = (
            <>
                {NAV_UNAUTH_ROUTES.map(({ href, label }, idx) => (
                    <Link key={idx} href={href} className={styles.nav_link}>
                        {label}
                    </Link>
                ))}
            </>
        )
    } else if (authStatus === AuthStatus.AUTH) {
        navLeft = (
            <>
                {NAV_AUTH_ROUTES.map(({ href, label }, idx) => (
                    <Link key={idx} href={href} className={styles.nav_link}>
                        {label}
                    </Link>
                ))}
            </>
        )

        navRight = <Button onClick={logout}>Log out</Button>
    }

    return (
        <nav className={styles.nav}>
            <div className={styles.nav_left}>
                <Link href="/" className={`${styles.nav_link} ${styles.nav_link_logo}`}>
                    <Logo />
                </Link>
                {navLeft}
            </div>
            {navRight}
        </nav>
    )
}
