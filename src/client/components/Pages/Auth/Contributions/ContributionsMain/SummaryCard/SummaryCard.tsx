import React from 'react'

import { StdTextSize } from '@/client/styles'
import { SHARED_Model__ContributionsClientInfo } from '@/shared/models/models/Contributions'
import { formatDateUTC__MDYYYY } from '@/shared/utils/dateUtils'

interface SummaryCardProps {
    contributionsClientInfo: SHARED_Model__ContributionsClientInfo
}

export const SummaryCard: React.FC<SummaryCardProps> = (props) => {
    const { contributionsClientInfo } = props
    const { contributions, dailyInfo, monthlyInfo, longestContributionStreak, longestContributionDrySpell } =
        contributionsClientInfo
    const { totalContributions, startedAt, endedAt } = contributions
    const { avgDailyContributions } = dailyInfo
    const { avgMonthlyContributions } = monthlyInfo

    return (
        <div>
            <h2 className={`${StdTextSize.Large}`}>
                Contributions from {formatDateUTC__MDYYYY(startedAt)}
                &nbsp;to {formatDateUTC__MDYYYY(endedAt)}
            </h2>
            <p>Total contributions: {totalContributions}</p>
            <p>Longest active streak: {longestContributionStreak} days</p>
            <p>Longest inactive streak: {longestContributionDrySpell} days</p>
            <p>Avg daily contributions: {avgDailyContributions.toFixed(1)}</p>
            <p>Avg monthly contributions: {avgMonthlyContributions.toFixed(1)}</p>
        </div>
    )
}
