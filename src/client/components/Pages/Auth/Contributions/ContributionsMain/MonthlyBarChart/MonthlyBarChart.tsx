import React from 'react'

import BarChart from '@/client/components/Reuse/d3/BarChart'
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

    const barChartData: { xLabel: string; y: number; color?: string }[] = contributionsByMonth.map(
        ({ month, contributionCount }) => {
            return { xLabel: month, y: contributionCount, color: PRIMARY_BAR_COLOR }
        },
    )

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
