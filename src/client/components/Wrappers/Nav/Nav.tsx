import styles from './Nav.module.css'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import Button from '@/client/components/Reuse/Button'
import Logo from '@/client/components/Reuse/Logo'
import { AuthStatus, useAuth } from '@/client/components/Wrappers/AuthProvider'
import { NAV_AUTH_ROUTES, NAV_UNAUTH_ROUTES } from '@/client/routes'
import { StdColors, StdJustify, StdLayout, StdMargin, StdPadding } from '@/client/styles'
import { InlineColors } from '@/client/styles/inline'

export const Nav: React.FC = () => {
    const { authStatus, logout } = useAuth()

    const pathname = usePathname()

    const linkClassName = `${styles.nav_link} ${StdLayout.FlexRow} ${StdMargin.L12} ${StdMargin.R12}`

    let navLeft: React.ReactElement | null = null
    let navRight: React.ReactElement | null = null
    if (authStatus === AuthStatus.UNAUTH) {
        navLeft = (
            <>
                {NAV_UNAUTH_ROUTES.map(({ href, label }, idx) => (
                    <Link
                        key={idx}
                        href={href}
                        className={`${pathname === href ? StdColors.Green : StdColors.White} ${linkClassName}`}
                    >
                        {label}
                    </Link>
                ))}
            </>
        )
    } else if (authStatus === AuthStatus.AUTH) {
        navLeft = (
            <>
                {NAV_AUTH_ROUTES.map(({ href, label }, idx) => (
                    <Link
                        key={idx}
                        href={href}
                        className={`${pathname === href ? StdColors.Green : StdColors.White} ${linkClassName}`}
                    >
                        {label}
                    </Link>
                ))}
            </>
        )

        navRight = <Button onClick={logout}>Log out</Button>
    }

    return (
        <nav
            className={`${StdLayout.FlexRow} ${StdJustify.Between} ${StdPadding.T6} ${StdPadding.R30} ${StdPadding.B6} ${StdPadding.L30}`}
            style={{ minHeight: 48, borderBottom: `2px solid ${InlineColors.LightGray}`, overflowX: 'auto' }}
        >
            <div className={`${StdLayout.FlexRow}`}>
                <Link href="/" className={`${styles.nav_link} ${StdLayout.FlexRow} ${StdMargin.R30}`}>
                    <Logo />
                </Link>
                {navLeft}
            </div>

            {navRight}
        </nav>
    )
}
