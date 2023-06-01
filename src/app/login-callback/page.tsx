import React from 'react'

import LoginCallback from '@/client/components/Pages/Unauth/LoginCallback'
import { VERSION_NUMBER } from '@/config/constants'

export default function LoginCallbackPage() {
    return (
        <main>
            <LoginCallback />
            <p>{VERSION_NUMBER}</p>
        </main>
    )
}
