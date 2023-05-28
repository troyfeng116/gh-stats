'use client'

import React, { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

import { useAuth } from '@/components/client/Auth'

export const LoginCallback: React.FC = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true)

    const params = useSearchParams()
    const { accessToken, login } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (params !== undefined) {
            const code = params.get('code')
            console.log(code)
            if (typeof code === 'object') {
                setIsLoading(false)
            } else {
                login(code, (success: boolean, error?: string) => {
                    setIsLoading(false)
                    if (success) {
                        router.push('/')
                        console.log('success!')
                    } else {
                        // TODO: better error messaging
                        router.push('/login')
                        console.log(error)
                    }
                })
            }
        }
    }, [router, params, login])

    if (isLoading) {
        return <div>Loading</div>
    }

    if (accessToken === undefined) {
        return <div>token not found</div>
    }

    return <div>AUTH! {accessToken}</div>
}
