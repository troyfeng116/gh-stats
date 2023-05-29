import React from 'react'

import Login from '@/components/client/Login'
import { VERSION_NUMBER } from '@/config/constants'

export default function LoginPage() {
    return (
        <main>
            <Login />
            <p>{VERSION_NUMBER}</p>
        </main>
    )
}
