import React from 'react'

import LanguageData from './LanguageData'
import RepoCell from './RepoCell'

import Card from '@/client/components/Reuse/Card'
import { StdLayout, StdMargin } from '@/client/styles'
import { SHARED_Model__LifetimeStats } from '@/shared/models/models/Stats'
import { kbToStr } from '@/shared/utils/toBytesStr'

interface LifetimeStatsProps {
    lifetimeStats: SHARED_Model__LifetimeStats
}

export const LifetimeStats: React.FC<LifetimeStatsProps> = (props) => {
    const { lifetimeStats } = props

    const { repos, rc_stats, language_stats } = lifetimeStats
    const { numRepos, numCommits, totalDiskUsage } = rc_stats
    const { allLanguageData } = language_stats

    return (
        <div className={`${StdLayout.FlexCol}`}>
            <Card className={`${StdMargin.B24}`}>
                <h3>repos: {numRepos}</h3>
                <p>total disk usage: {kbToStr(totalDiskUsage)}</p>
                <h3>commits: {numCommits}</h3>
            </Card>

            <Card className={`${StdMargin.B24}`}>
                <h3>language data across all contributed repos:</h3>
                <LanguageData languageData={allLanguageData} shouldShowBytes={true} />
            </Card>

            <Card>
                {repos.map((repo, idx) => {
                    const { name } = repo
                    return <RepoCell key={`${name}-${idx}`} repo={repo} />
                })}
            </Card>
        </div>
    )
}
