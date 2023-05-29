import React from 'react'

import LoginCallback from '@/components/LoginCallback'
import { VERSION_NUMBER } from '@/config/constants'

export default function LoginCallbackPage() {
    return (
        <main>
            <LoginCallback />
            <p>{VERSION_NUMBER}</p>
        </main>
    )
}
