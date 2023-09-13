import React from 'react'

import AllContributionsGraph from './AllContributionsGraph'
import ByRepo from './ByRepo'
import CalendarGrid from './CalendarGrid'
import DailyContributionInfo from './DailyContributionInfo'
import MonthlyContributionInfo from './MonthlyContributionInfo'

import { SHARED_Model__ContributionsClientInfo } from '@/shared/models/models/Contributions'
import { formatDateUTC__MDYYYY } from '@/shared/utils/dateUtils'

interface ContributionsMainProps {
    contributionsClientInfo: SHARED_Model__ContributionsClientInfo
}

export const ContributionsMain: React.FC<ContributionsMainProps> = (props) => {
    const { contributionsClientInfo } = props

    const {
        contributions,
        calendarGrid,
        dailyInfo,
        monthlyInfo,
        longestContributionStreak,
        longestContributionDrySpell,
    } = contributionsClientInfo
    const { totalContributions, commitContributionsByRepository, startedAt, endedAt } = contributions

    return (
        <div>
            <h2>
                Contributions from {formatDateUTC__MDYYYY(startedAt)}
                &nbsp;to {formatDateUTC__MDYYYY(endedAt)}
            </h2>
            <h3>Total contributions: {totalContributions}</h3>
            <p>Longest active streak: {longestContributionStreak} days</p>
            <p>Longest inactive streak: {longestContributionDrySpell} days</p>

            <div>
                <h3>Contributions calendar</h3>
                <CalendarGrid calendarGrid={calendarGrid} />
            </div>
            <DailyContributionInfo dailyContributionInfo={dailyInfo} />
            <MonthlyContributionInfo monthlyContributionInfo={monthlyInfo} />

            <div>
                <h3>Commit contributions graph</h3>
                <AllContributionsGraph contributionsByRepo={commitContributionsByRepository} />
            </div>
            <div>
                <h3>Commit contributions by repository</h3>
                <ByRepo contributionsByRepo={commitContributionsByRepository} />
            </div>
        </div>
    )
}
