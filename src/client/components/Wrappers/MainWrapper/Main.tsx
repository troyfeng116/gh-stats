import styles from './Main.module.css'

import React from 'react'

import { StdLayout } from '@/client/styles'

interface MainProps {
    children: React.ReactNode
}

export const Main: React.FC<MainProps> = (props) => {
    const { children } = props

    return (
        <main className={`${styles.main} ${StdLayout.FlexCol}`}>
            <div className={`${styles.main_inner}`}>{children}</div>
        </main>
    )
}
