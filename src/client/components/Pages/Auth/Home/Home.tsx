'use client'

import React, { useEffect, useState } from 'react'

import UserCard from '@/client/components/Pages/Auth/Home/UserCard'
import Loading from '@/client/components/Reuse/Loading'
import { useAuth } from '@/client/components/Wrappers/AuthProvider'
import { getUserCardAPI } from '@/client/lib/authAPI'
import { SHARED_Model__UserCardClientInfo } from '@/shared/models/models/UserCard'

export const Home: React.FC = () => {
    const { accessToken } = useAuth()

    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [error, setError] = useState<string>()
    const [userCardClientInfo, setUserCardClientInfo] = useState<SHARED_Model__UserCardClientInfo>()

    useEffect(() => {
        const fetchUserCardClientInfo = async (accessToken: string) => {
            setError(undefined)
            const { success, error, userCardClientInfo: updatedUserCardClientInfo } = await getUserCardAPI(accessToken)
            setIsLoading(false)
            if (!success || updatedUserCardClientInfo === undefined) {
                setError(error)
            } else {
                setUserCardClientInfo(updatedUserCardClientInfo)
            }
        }

        if (accessToken !== undefined) {
            fetchUserCardClientInfo(accessToken)
        }
    }, [accessToken])

    if (isLoading) {
        return <Loading />
    }

    if (error !== undefined || userCardClientInfo === undefined) {
        return <div>{error}</div>
    }

    return <UserCard userCardClientInfo={userCardClientInfo} />
}
