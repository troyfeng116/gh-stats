'use client'

import React, { useEffect, useState } from 'react'

import UserCard from '@/client/components/Pages/Auth/Home/UserCard'
import { useAuth } from '@/client/components/Wrappers/AuthProvider'
import { getUserCardAPI } from '@/client/lib/authAPI'
import { SHARED_Model__UserCard } from '@/shared/models/models/UserCard'

export const Home: React.FC = () => {
    const { accessToken } = useAuth()

    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [error, setError] = useState<string>()
    const [userCard, setUserCard] = useState<SHARED_Model__UserCard>()

    useEffect(() => {
        const fetchUserCard = async (accessToken: string) => {
            setError(undefined)
            const { success, error, userCard: getUserCardAPIRes } = await getUserCardAPI(accessToken)
            setIsLoading(false)
            if (!success || getUserCardAPIRes === undefined) {
                setError(error)
            } else {
                setUserCard(getUserCardAPIRes)
            }
        }

        if (accessToken !== undefined) {
            fetchUserCard(accessToken)
        }
    }, [accessToken])

    if (isLoading) {
        return <div>user card loading...</div>
    }

    if (error !== undefined || userCard === undefined) {
        return <div>{error}</div>
    }

    return (
        <div>
            <UserCard userCard={userCard} />
        </div>
    )
}
