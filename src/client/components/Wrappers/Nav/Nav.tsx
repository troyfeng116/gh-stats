import styles from './Nav.module.css'

import React from 'react'
import { FaGithub } from 'react-icons/fa'
import Link from 'next/link'

import Button from '@/client/components/Reuse/Button'
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
                <div className={styles.nav_left}>
                    <Link href="/" className={`${styles.nav_link} ${styles.nav_link_logo}`}>
                        <FaGithub size={27} />
                        stats
                    </Link>
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
