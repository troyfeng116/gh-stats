import React from 'react'

import BarChart, { BarChartData } from '@/client/components/Reuse/d3/BarChart'
import { PRIMARY_BAR_COLOR } from '@/client/utils/charts/chartColors'
import { SHARED_Model__DailyContributionsInfo } from '@/shared/models/models/Contributions'
import { weekdayIntToFullName } from '@/shared/utils/weekdayIntToName'

interface DailyBarChartProps {
    dailyContributionInfo: SHARED_Model__DailyContributionsInfo
    width?: number
    height?: number
}

export const DailyBarChart: React.FC<DailyBarChartProps> = (props) => {
    const { dailyContributionInfo, width = 530, height = 390 } = props
    const { contributionsByWeekday } = dailyContributionInfo

    const barChartData: BarChartData[] = contributionsByWeekday.map((contributionCount, weekdayIdx) => {
        return {
            xLabel: weekdayIntToFullName(weekdayIdx),
            y: contributionCount,
            barLabel: contributionCount > 0 ? `${contributionCount}` : undefined,
            color: PRIMARY_BAR_COLOR,
        }
    })

    return (
        <BarChart
            title="Breakdown by weekday"
            data={barChartData}
            width={width}
            height={height}
            axisHorizontalPadding={39}
            xAxisLabel="Weekday"
            yAxisProperties={{
                label: 'Contributions',
            }}
        />
    )
}
