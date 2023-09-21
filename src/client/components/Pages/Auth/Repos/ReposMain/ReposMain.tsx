import React from 'react'

import LanguageData from './LanguageData'
import RepoDropdown from './RepoDropdown'
import ReposSummary from './ReposSummary'

import Card, { CardType } from '@/client/components/Reuse/Card'
import { StdLayout, StdMargin, StdTextSize } from '@/client/styles'
import { SHARED_Model__LifetimeStats } from '@/shared/models/models/Stats'

interface ReposMainProps {
    lifetimeStats: SHARED_Model__LifetimeStats
}

export const ReposMain: React.FC<ReposMainProps> = (props) => {
    const { lifetimeStats } = props

    const { repos, rc_stats, language_stats } = lifetimeStats
    const { allLanguageData } = language_stats

    return (
        <div className={`${StdLayout.FlexCol}`}>
            <Card className={`${StdMargin.B60} ${StdLayout.FlexCol}`}>
                <ReposSummary repoCommitCountStats={rc_stats} />
            </Card>

            <Card className={`${StdMargin.B60} ${StdLayout.FlexCol}`} type={CardType.Secondary}>
                <h3 className={`${StdTextSize.Medium} ${StdMargin.B18}`}>Language breakdown across public repos</h3>
                <LanguageData languageData={allLanguageData} />
            </Card>

            {repos.map((repo, idx) => {
                const { name } = repo
                return <RepoDropdown key={`repo-cell-card-${name}-${idx}`} repo={repo} />
            })}
        </div>
    )
}
