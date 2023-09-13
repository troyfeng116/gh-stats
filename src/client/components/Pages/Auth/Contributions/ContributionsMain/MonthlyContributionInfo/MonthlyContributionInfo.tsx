import React from 'react'

import { SHARED_Model__MonthlyContributionsInfo } from '@/shared/models/models/Contributions'

interface MonthlyContributionInfoProps {
    monthlyContributionInfo: SHARED_Model__MonthlyContributionsInfo
}

export const MonthlyContributionInfo: React.FC<MonthlyContributionInfoProps> = (props) => {
    const { monthlyContributionInfo } = props
    const { avgMonthlyContributions, contributionsByMonthAndYear, contributionsByMonth } = monthlyContributionInfo

    return (
        <div>
            <p>Average contributions per month: {avgMonthlyContributions}</p>
            {contributionsByMonthAndYear.map(({ monthAndYear, contributionCount }, idx) => {
                return (
                    <p key={`contributions-month-year-${idx}`}>
                        {monthAndYear}: {contributionCount} contributions
                    </p>
                )
            })}
            {contributionsByMonth.map(({ month, contributionCount }, idx) => {
                return (
                    <p key={`contributions-month-${idx}`}>
                        {month}: {contributionCount} contributions
                    </p>
                )
            })}
        </div>
    )
}
