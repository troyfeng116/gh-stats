import React, { useEffect, useState } from 'react'

import { lifetimeStatsAPI } from '@/client/lib/authAPI'
import {
    SHARED_Model__RepoCommitCountStats,
    SHARED_Model__RepoWithCountCommits as SHARED_Model__RepoWithCommitCount,
} from '@/shared/models'

interface LifetimeCommitsProps {
    accessToken: string
}

export const LifetimeCommits: React.FC<LifetimeCommitsProps> = (props) => {
    const { accessToken } = props
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [error, setError] = useState<string>()
    const [repos, setRepos] = useState<SHARED_Model__RepoWithCommitCount[]>()
    const [lifetimeStats, setLifetimeStats] = useState<SHARED_Model__RepoCommitCountStats>()

    useEffect(() => {
        const fetchUserCard = async (accessToken: string) => {
            setError(undefined)
            const { success, error, stats: updatedStats, repos: updatedRepos } = await lifetimeStatsAPI(accessToken)
            setIsLoading(false)
            if (!success || updatedStats === undefined || updatedRepos === undefined) {
                setError(error)
            } else {
                setLifetimeStats(updatedStats)
                setRepos(updatedRepos)
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

    if (lifetimeStats === undefined || repos === undefined) {
        return <div>no lifetime stats found</div>
    }

    const { numRepos, numCommits } = lifetimeStats
    return (
        <div>
            LIFETIME STATS
            <p>repos: {numRepos}</p>
            <p>commits: {numCommits}</p>
            <div>
                {repos.map((repo, idx) => {
                    const {
                        name,
                        owner: { login },
                        totalCount,
                    } = repo
                    return (
                        <p key={idx}>
                            {login}/{name}: {totalCount} commits
                        </p>
                    )
                })}
            </div>
        </div>
    )
}
