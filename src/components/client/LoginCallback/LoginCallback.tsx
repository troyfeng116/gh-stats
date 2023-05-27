'use client'

import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

import { useAuth } from '@/components/client/Auth'

export const LoginCallback: React.FC = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const params = useSearchParams()

    const { accessToken, login } = useAuth()

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
                        console.log('success!')
                    } else {
                        console.log(error)
                    }
                })
            }
        }
    }, [params])

    if (isLoading) {
        return <div>Loading</div>
    }

    if (accessToken === undefined) {
        return <div>token not found</div>
    }

    return <div>AUTH! {accessToken}</div>
}
