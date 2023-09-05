import React from 'react'

import { SHARED_Model__DailyContributionsInfo } from '@/shared/models/models/Contributions'
import { weekdayIntToFullName } from '@/shared/utils/weekdayIntToName'

interface DailyContributionInfoProps {
    dailyContributionInfo: SHARED_Model__DailyContributionsInfo
}

export const DailyContributionInfo: React.FC<DailyContributionInfoProps> = (props) => {
    const { dailyContributionInfo } = props
    const { avgDailyContributions, contributionsByWeekday } = dailyContributionInfo

    return (
        <div>
            <p>Average contributions per day: {avgDailyContributions}</p>
            {contributionsByWeekday.map((contributionCount, weekdayIdx) => {
                return (
                    <p key={weekdayIdx}>
                        {weekdayIntToFullName(weekdayIdx)}: {contributionCount} contributions
                    </p>
                )
            })}
        </div>
    )
}
