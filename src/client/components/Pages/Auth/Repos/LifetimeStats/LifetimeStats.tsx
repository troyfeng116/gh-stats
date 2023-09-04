import styles from './LifetimeStats.module.css'

import React from 'react'

import LanguageData from './LanguageData'
import RepoCell from './RepoCell'

import { SHARED_Model__LifetimeStats } from '@/shared/models/models/Stats'
import { kbToStr } from '@/shared/utils/toBytesStr'

interface LifetimeStatsProps {
    lifetimeStats: SHARED_Model__LifetimeStats
}

export const LifetimeStats: React.FC<LifetimeStatsProps> = (props) => {
    const { lifetimeStats } = props

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
