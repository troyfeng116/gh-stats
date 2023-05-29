'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'

import { AuthStatus, useAuth } from '@/components/client/Auth'
import { TestAPIResponse } from '@/models/api'

export const Home: React.FC = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [numStars, setNumStars] = useState<number>()

    const { authStatus, logout } = useAuth()

    useEffect(() => {
        const testFetch = async () => {
            console.log('fetch')
            const res = await fetch('/api/test', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            console.log('fetch complete')
            const resJson = await res.json()
            const testResponse = resJson as TestAPIResponse
            console.log(testResponse)
            setIsLoading(false)
            setNumStars(testResponse.numStars)
        }

        if (authStatus === AuthStatus.AUTH) {
            testFetch()
        }
    }, [authStatus])

    if (authStatus !== AuthStatus.AUTH) {
        return (
            <div>
                <Link href="/login">Please login</Link>
            </div>
        )
    }

    if (isLoading) {
        return <div>loading...</div>
    }

    if (numStars === undefined) {
        return <div>numStars not found</div>
    }

    return (
        <div>
            {numStars}
            <button onClick={() => logout()}>Log out</button>
        </div>
    )
}
