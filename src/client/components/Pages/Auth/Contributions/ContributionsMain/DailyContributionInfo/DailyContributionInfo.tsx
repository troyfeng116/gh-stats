import React from 'react'

import BarChart from '@/client/components/Reuse/d3/BarChart'
import { getRandomScatterPointColor } from '@/client/utils/scatterPointColors'
import { SHARED_Model__DailyContributionsInfo } from '@/shared/models/models/Contributions'
import { weekdayIntToFullName } from '@/shared/utils/weekdayIntToName'

interface DailyContributionInfoProps {
    dailyContributionInfo: SHARED_Model__DailyContributionsInfo
}

export const DailyContributionInfo: React.FC<DailyContributionInfoProps> = (props) => {
    const { dailyContributionInfo } = props
    const { avgDailyContributions, contributionsByWeekday } = dailyContributionInfo

    const barChartData: { xLabel: string; y: number }[] = contributionsByWeekday.map(
        (contributionCount, weekdayIdx) => {
            return { xLabel: weekdayIntToFullName(weekdayIdx), y: contributionCount }
        },
    )

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
            <BarChart
                data={barChartData}
                width={590}
                height={390}
                axisHorizontalPadding={69}
                color={getRandomScatterPointColor()}
                xAxisLabel="Weekday"
            />
        </div>
    )
}