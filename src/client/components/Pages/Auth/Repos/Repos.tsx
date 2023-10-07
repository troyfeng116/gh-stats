'use client'

import React, { useEffect, useState } from 'react'

import ReposMain from './ReposMain'

import Loading from '@/client/components/Reuse/Loading'
import { useAuth } from '@/client/components/Wrappers/AuthProvider'
import { lifetimeStatsAPI } from '@/client/lib/authAPI'
import { SHARED_Model__LifetimeStats } from '@/shared/models/models/Stats'

export const Repos: React.FC = () => {
    const { accessToken } = useAuth()

    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [error, setError] = useState<string>()
    const [lifetimeStats, setLifetimeStats] = useState<SHARED_Model__LifetimeStats>()

    useEffect(() => {
        const fetchUserCard = async (accessToken: string) => {
            setError(undefined)
            const { success, error, lifetimeStats } = await lifetimeStatsAPI(accessToken)
            setIsLoading(false)
            if (!success || lifetimeStats === undefined) {
                setError(error)
            } else {
                setLifetimeStats(lifetimeStats)
            }
        }

        if (accessToken !== undefined) {
            fetchUserCard(accessToken)
        }
    }, [accessToken])

    if (isLoading) {
        return <Loading />
    }

    if (error !== undefined || lifetimeStats === undefined) {
        return <div>{error}</div>
    }

    return <ReposMain lifetimeStats={lifetimeStats} />
}
