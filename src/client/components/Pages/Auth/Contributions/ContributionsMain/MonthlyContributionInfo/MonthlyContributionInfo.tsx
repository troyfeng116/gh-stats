import React from 'react'

import BarChart from '@/client/components/Reuse/d3/BarChart'
import { PRIMARY_BAR_COLOR } from '@/client/utils/scatterPointColors'
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
        </div>
    )
}
