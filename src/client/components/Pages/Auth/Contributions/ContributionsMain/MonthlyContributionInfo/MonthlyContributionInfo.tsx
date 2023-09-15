import React from 'react'

import BarChart from '@/client/components/Reuse/d3/BarChart'
import Histogram from '@/client/components/Reuse/d3/Histogram'
import { PRIMARY_BAR_COLOR } from '@/client/utils/charts/chartColors'
import { computeAxisTickOverrides } from '@/client/utils/charts/computeTickOverrides'
import { dataToContributionsMonthAndYearMapping } from '@/client/utils/charts/dataPointToTooltipLabel'
import { tickValueToMonthAndYearLabel } from '@/client/utils/charts/tickValueToLabel'
import { SHARED_Model__MonthlyContributionsInfo } from '@/shared/models/models/Contributions'

interface MonthlyContributionInfoProps {
    monthlyContributionInfo: SHARED_Model__MonthlyContributionsInfo
}

export const MonthlyContributionInfo: React.FC<MonthlyContributionInfoProps> = (props) => {
    const { monthlyContributionInfo } = props
    const { avgMonthlyContributions, contributionsByMonthAndYear, contributionsByMonth } = monthlyContributionInfo

    const barChartData: { xLabel: string; y: number; color?: string }[] = contributionsByMonth.map(
        ({ month, contributionCount }) => {
            return { xLabel: month, y: contributionCount, color: PRIMARY_BAR_COLOR }
        },
    )

    const monthAndYearPoints: { x: number; y: number }[] = contributionsByMonthAndYear.map(
        ({ monthAndYear, contributionCount }) => {
            return { x: new Date(monthAndYear).getTime(), y: contributionCount }
        },
    )
    const histogramData: {
        points: { x: number; y: number }[]
        color?: string
        r?: number
    }[] = Array.of({
        points: monthAndYearPoints,
        color: PRIMARY_BAR_COLOR,
        r: 3,
    })

    return (
        <div>
            <p>Average contributions per month: {avgMonthlyContributions.toFixed(2)}</p>
            <BarChart
                data={barChartData}
                width={690}
                height={390}
                axisHorizontalPadding={39}
                barPadding={9}
                xAxisLabel="Month"
                yAxisProperties={{
                    label: 'Contributions',
                }}
            />
            <Histogram
                data={histogramData}
                width={690}
                height={390}
                yAxisProperties={{
                    label: 'Contributions',
                }}
                xAxisProperties={{
                    label: 'Month/Year',
                    tickMarkOverride: computeAxisTickOverrides(
                        monthAndYearPoints.map(({ x }) => x),
                        18,
                    ),
                    tickLabelMapping: tickValueToMonthAndYearLabel,
                }}
                dataTooltipMapping={dataToContributionsMonthAndYearMapping}
            />
        </div>
    )
}
