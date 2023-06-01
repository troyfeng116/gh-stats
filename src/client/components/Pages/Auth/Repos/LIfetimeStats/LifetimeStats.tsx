import React, { useEffect, useState } from 'react'

import { lifetimeStatsAPI } from '@/client/lib/authAPI'
import { SHARED_Model__LifetimeStats } from '@/shared/models'

interface LifetimeCommitsProps {
    accessToken: string
}

export const LifetimeCommits: React.FC<LifetimeCommitsProps> = (props) => {
    const { accessToken } = props
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

    const { repos, rc_stats, lines_stats, language_stats } = lifetimeStats
    const { numRepos, numCommits } = rc_stats
    const { numLines, numAdditions, numDeletions } = lines_stats
    const { totalDiskUsage, languageToDisk } = language_stats

    const languageDiskArr: { name: string; diskSpace: number }[] = []
    for (const name in languageToDisk) {
        languageDiskArr.push({ name: name, diskSpace: languageToDisk[name] })
    }

    return (
        <div>
            LIFETIME STATS
            <p>repos: {numRepos}</p>
            <p>commits: {numCommits}</p>
            <p>
                lines of code: {numLines}
                {numAdditions !== undefined && numDeletions !== undefined
                    ? ` (${numAdditions} additions - ${numDeletions} deletions)`
                    : ''}
            </p>
            <div>
                <p>total disk usage: {totalDiskUsage}</p>
                <div>
                    {languageDiskArr.map(({ name, diskSpace }) => {
                        return (
                            <p key={name}>
                                {name}: {diskSpace} bytes
                            </p>
                        )
                    })}
                </div>
            </div>
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
