import React from 'react'

import HrDivider from '@/client/components/Reuse/HrDivider'
import StatRow from '@/client/components/Reuse/StatRow'
import { StdColors, StdLayout, StdMargin, StdTextSize } from '@/client/styles'
import { SHARED_Model__ContributionsClientInfo } from '@/shared/models/models/Contributions'
import { formatDateUTC__MDYY, formatDateUTC__MDYYYY } from '@/shared/utils/dateUtils'

interface ContributionsSummaryProps {
    contributionsClientInfo: SHARED_Model__ContributionsClientInfo
}

export const ContributionsSummary: React.FC<ContributionsSummaryProps> = (props) => {
    const { contributionsClientInfo } = props
    const { contributions, dailyInfo, monthlyInfo, longestContributionStreak, longestContributionDrySpell } =
        contributionsClientInfo
    const { totalContributions, startedAt, endedAt } = contributions
    const { avgDailyContributions, mostActiveDay } = dailyInfo
    const { maxContributions: maxContributionDayCount, maxDate: maxContributionDayDate } = mostActiveDay
    const { avgMonthlyContributions } = monthlyInfo

    return (
        <div className={`${StdLayout.FlexCol}`}>
            <h2 className={`${StdTextSize.Large} ${StdMargin.B6}`}>Contributions</h2>
            <p className={`${StdColors.LightGray} ${StdMargin.B12}`}>
                {formatDateUTC__MDYYYY(startedAt)} to {formatDateUTC__MDYYYY(endedAt)}
            </p>

            <HrDivider />
            <StatRow value={totalContributions} label="total contributions" />
            <StatRow value={avgDailyContributions.toFixed(1)} label="avg per day" />
            <StatRow value={avgMonthlyContributions.toFixed(1)} label="avg per month" />
            <StatRow
                value={maxContributionDayCount}
                label={`on most active day (${formatDateUTC__MDYY(maxContributionDayDate)})`}
            />
            <HrDivider />
            <StatRow value={longestContributionStreak} label="longest streak" />
            <StatRow value={longestContributionDrySpell} label="longest slump" />
        </div>
    )
}
