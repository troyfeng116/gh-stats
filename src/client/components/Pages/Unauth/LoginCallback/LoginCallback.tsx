'use client'

import React, { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

import { useAuth } from '@/client/components/Wrappers/AuthProvider'

export const LoginCallback: React.FC = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true)

    const params = useSearchParams()
    const { login } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (params !== undefined) {
            const code = params.get('code')
            console.log(code)
            if (code === null) {
                router.push('/login')
            } else {
                login(code, (success: boolean, error?: string) => {
                    setIsLoading(false)
                    if (success) {
                        console.log('success!')
                    } else {
                        // TODO: better error messaging
                        console.log(error)
                    }
                })
            }
        }
    }, [router, params, login])

    if (isLoading) {
        return <div>Logging in...</div>
    }

    return null
}
