import styles from './Main.module.css'

import React from 'react'

interface MainProps {
    children: React.ReactNode
}

export const Main: React.FC<MainProps> = (props) => {
    const { children } = props

    return <main className={styles.main}>{children}</main>
}
