import styles from './page.module.css'

import React from 'react'

import Home from '@/components/Home'
import { VERSION_NUMBER } from '@/config/constants'

export default function HomePage() {
    return (
        <main className={styles.main}>
            <Home />
            <p>{VERSION_NUMBER}</p>
        </main>
    )
}
