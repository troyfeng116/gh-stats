import styles from './LifetimeStats.module.css'

import React, { useEffect, useState } from 'react'

import LanguageData from './LanguageData'
import RepoCell from './RepoCell'

import { lifetimeStatsAPI } from '@/client/lib/authAPI'
import { SHARED_Model__LifetimeStats } from '@/shared/models'
import { kbToStr } from '@/shared/utils/toBytesStr'

interface LifetimeStatsProps {
    accessToken: string
}

export const LifetimeStats: React.FC<LifetimeStatsProps> = (props) => {
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

    const { repos, rc_stats, language_stats } = lifetimeStats
    const { numRepos, numCommits } = rc_stats
    // const { numLines, numAdditions, numDeletions } = lines_stats
    const { allLanguageData } = language_stats

    let totalRepoDiskUsage = 0
    for (let i = 0; i < repos.length; i++) {
        const { diskUsage } = repos[i]
        totalRepoDiskUsage += diskUsage
    }

    allLanguageData.sort((a, b) => b.size - a.size)

    return (
        <div>
            <h1>Lifetime stats</h1>
            <div className={styles.section}>
                <h3>repos: {numRepos}</h3>
                <p>total disk usage: {kbToStr(totalRepoDiskUsage)}</p>
                <h3>commits: {numCommits}</h3>
            </div>

            <div className={styles.section}>
                <h3>language data across all contributed repos:</h3>
                <LanguageData languageData={allLanguageData} shouldShowBytes={true} />
            </div>

            <div className={styles.section}>
                <div className={styles.card_container}>
                    {repos.map((repo, idx) => {
                        const { name } = repo
                        return <RepoCell key={`${name}-${idx}`} repo={repo} />
                    })}
                </div>
            </div>
        </div>
    )
}
