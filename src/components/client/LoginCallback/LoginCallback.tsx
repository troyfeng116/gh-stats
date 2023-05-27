'use client'

import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

import { getTokenAPI } from '@/client/lib'

export const LoginCallback: React.FC = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [code, setCode] = useState<string>()
    const [token, setToken] = useState<string>()
    const params = useSearchParams()

    useEffect(() => {
        if (params !== undefined) {
            const code = params.get('code')
            console.log(code)
            if (typeof code === 'object') {
                setIsLoading(false)
                setCode(undefined)
            } else {
                setCode(code)
            }
        }
    }, [params])

    useEffect(() => {
        if (code !== undefined) {
            const testFetch = async () => {
                const tokenResponse = await getTokenAPI(code)
                console.log(tokenResponse)
                const { success, accessToken } = tokenResponse
                setIsLoading(false)
                if (!success || accessToken === undefined) {
                    setToken(undefined)
                } else {
                    setToken(accessToken)
                }
            }

            testFetch()
        }
    }, [code])

    if (isLoading) {
        return <div>Loading</div>
    }

    if (code === undefined) {
        return <div>Code not found</div>
    }

    if (token === undefined) {
        return <div>token not found</div>
    }

    return <div>AUTH! {token}</div>
}
