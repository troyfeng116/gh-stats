import React from 'react'

import BarChart from '@/client/components/Reuse/d3/BarChart'
import { PRIMARY_BAR_COLOR } from '@/client/utils/charts/chartColors'
import { SHARED_Model__DailyContributionsInfo } from '@/shared/models/models/Contributions'
import { weekdayIntToFullName } from '@/shared/utils/weekdayIntToName'

interface DailyBarChartProps {
    width?: number
    height?: number
    dailyContributionInfo: SHARED_Model__DailyContributionsInfo
}

export const DailyBarChart: React.FC<DailyBarChartProps> = (props) => {
    const { width = 530, height = 390, dailyContributionInfo } = props
    const { contributionsByWeekday } = dailyContributionInfo

    const barChartData: { xLabel: string; y: number; color?: string }[] = contributionsByWeekday.map(
        (contributionCount, weekdayIdx) => {
            return { xLabel: weekdayIntToFullName(weekdayIdx), y: contributionCount, color: PRIMARY_BAR_COLOR }
        },
    )

    return (
        <BarChart
            title="Breakdown by weekday"
            data={barChartData}
            width={width}
            height={height}
            axisHorizontalPadding={69}
            xAxisLabel="Weekday"
            yAxisProperties={{
                label: 'Contributions',
            }}
        />
    )
}
