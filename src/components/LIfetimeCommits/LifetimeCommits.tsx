import React, { useEffect, useState } from 'react'

import { lifetimeStatsAPI } from '@/client/lib/authAPI'
import { SHARED_Model_LifetimeStats } from '@/shared/models'

interface LifetimeCommitsProps {
    accessToken: string
}

export const LifetimeCommits: React.FC<LifetimeCommitsProps> = (props) => {
    const { accessToken } = props
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [error, setError] = useState<string>()
    const [lifetimeStats, setLifetimeStats] = useState<SHARED_Model_LifetimeStats>()

    useEffect(() => {
        const fetchUserCard = async (accessToken: string) => {
            setError(undefined)
            const { success, error, stats } = await lifetimeStatsAPI(accessToken)
            setIsLoading(false)
            if (!success || stats === undefined) {
                setError(error)
            } else {
                setLifetimeStats(stats)
            }
        }

        fetchUserCard(accessToken)
    }, [accessToken])

    if (isLoading) {
        return <div>lifetime stats loading...</div>
    }

    if (error !== undefined) {
        return <div>{error}</div>
    }

    if (lifetimeStats === undefined) {
        return <div>no lifetime stats found</div>
    }

    const { numRepos, numCommits, numLines, numAdditions, numDeletions } = lifetimeStats
    return (
        <div>
            LIFETIME STATS
            <p>repos: {numRepos}</p>
            <p>commits: {numCommits}</p>
            <p>
                lines of code: {numLines} ({numAdditions} - {numDeletions})
            </p>
        </div>
    )
}
