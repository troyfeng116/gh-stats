import React from 'react'

import LanguageData from './LanguageData'
import ReposSummary from './ReposSummary'

import Card, { CardType } from '@/client/components/Reuse/Card'
import Dropdown from '@/client/components/Reuse/Dropdown'
import { StdColors, StdLayout, StdMargin, StdTextSize } from '@/client/styles'
import { SHARED_Model__LifetimeStats } from '@/shared/models/models/Stats'
import { kbToStr } from '@/shared/utils/toBytesStr'

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
                const {
                    name,
                    owner: { login },
                    diskUsage,
                    totalCount,
                    languageData,
                } = repo
                const repoKey = `${login}/${name}`

                return (
                    <Card
                        key={`repo-cell-card-${name}-${idx}`}
                        className={`${StdMargin.B18} ${StdLayout.FlexCol}`}
                        type={CardType.Secondary}
                    >
                        <Dropdown
                            header={<h3 className={`${StdTextSize.Medium}`}>{repoKey}</h3>}
                            headerClassName={`${StdLayout.FlexRowCenter}`}
                        >
                            <div
                                className={`${StdColors.LightGray} ${StdLayout.FlexCol} ${StdMargin.T12} ${StdMargin.B18}`}
                            >
                                <p>{kbToStr(diskUsage)} of total repo disk usage</p>
                                <p>{totalCount} repo commits</p>
                            </div>
                            <LanguageData languageData={languageData} chartWidth={590} chartHeight={390} />
                        </Dropdown>
                    </Card>
                )
            })}
        </div>
    )
}
