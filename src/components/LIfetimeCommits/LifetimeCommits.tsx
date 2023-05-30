import React, { useEffect, useState } from 'react'

import { lifeTimeCommitsAPI } from '@/client/lib/authAPI'

interface LifetimeCommitsProps {
    accessToken: string
}

export const LifetimeCommits: React.FC<LifetimeCommitsProps> = (props) => {
    const { accessToken } = props
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [error, setError] = useState<string>()
    const [lifetimeCommits, setLifetimeCommits] = useState<number>()

    useEffect(() => {
        const fetchUserCard = async (accessToken: string) => {
            setError(undefined)
            const { success, error, lifetimeCommits: lifetimeCommitsAPIRes } = await lifeTimeCommitsAPI(accessToken)
            setIsLoading(false)
            if (!success || lifetimeCommitsAPIRes === undefined) {
                setError(error)
            } else {
                setLifetimeCommits(lifetimeCommitsAPIRes)
            }
        }

        fetchUserCard(accessToken)
    }, [accessToken])

    if (isLoading) {
        return <div>lifetime commits loading...</div>
    }

    if (error !== undefined) {
        return <div>{error}</div>
    }

    return <div>Lifetime commits: {lifetimeCommits}</div>
}
