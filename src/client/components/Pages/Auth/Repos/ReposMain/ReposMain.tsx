import React from 'react'

import LanguageData from './LanguageData'
import RepoCell from './RepoCell'
import ReposSummary from './ReposSummary'

import Card from '@/client/components/Reuse/Card'
import { StdLayout, StdMargin } from '@/client/styles'
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
            <Card className={`${StdMargin.B30} ${StdLayout.FlexCol}`}>
                <ReposSummary repoCommitCountStats={rc_stats} />
            </Card>

            <Card className={`${StdMargin.B30}`}>
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
