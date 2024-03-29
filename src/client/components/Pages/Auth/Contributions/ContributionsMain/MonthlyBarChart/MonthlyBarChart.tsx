import React from 'react'

import BarChart, { BarChartData } from '@/client/components/Reuse/d3/BarChart'
import { PRIMARY_BAR_COLOR } from '@/client/utils/charts/chartColors'

interface MonthlyBarChartProps {
    contributionsByMonth: {
        month: string
        contributionCount: number
    }[]
    width?: number
    height?: number
}

export const MonthlyBarChart: React.FC<MonthlyBarChartProps> = (props) => {
    const { contributionsByMonth, width = 530, height = 390 } = props

    const barChartData: BarChartData[] = contributionsByMonth.map(({ month, contributionCount }) => {
        return {
            xLabel: month,
            y: contributionCount,
            barLabel: contributionCount > 0 ? `${contributionCount}` : undefined,
            color: PRIMARY_BAR_COLOR,
        }
    })

    return (
        <BarChart
            title="Breakdown by month"
            data={barChartData}
            width={width}
            height={height}
            axisHorizontalPadding={29}
            barPadding={3}
            xAxisLabel="Month"
            yAxisProperties={{
                label: 'Contributions',
            }}
        />
    )
}
