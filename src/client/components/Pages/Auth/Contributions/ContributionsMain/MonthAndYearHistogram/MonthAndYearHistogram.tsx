import React from 'react'

import Histogram, { HistogramData } from '@/client/components/Reuse/d3/Histogram'
import { PRIMARY_BAR_COLOR } from '@/client/utils/charts/chartColors'
import { computeAxisTickOverrides } from '@/client/utils/charts/computeTickOverrides'
import { dataToContributionsMonthAndYearMapping } from '@/client/utils/charts/dataPointToTooltipLabel'
import { tickValueToMonthAndYearLabel } from '@/client/utils/charts/tickValueToLabel'

interface MonthAndYearHistogramProps {
    contributionsByMonthAndYear: {
        monthAndYear: string
        contributionCount: number
    }[]
    width?: number
    height?: number
}

export const MonthAndYearHistogram: React.FC<MonthAndYearHistogramProps> = (props) => {
    const { contributionsByMonthAndYear, width = 790, height = 390 } = props
    const monthAndYearPoints: { x: number; y: number }[] = contributionsByMonthAndYear.map(
        ({ monthAndYear, contributionCount }) => {
            return { x: new Date(monthAndYear).getTime(), y: contributionCount }
        },
    )

    const histogramData: HistogramData[] = Array.of({
        points: monthAndYearPoints,
        color: PRIMARY_BAR_COLOR,
        r: 3,
    })

    return (
        <Histogram
            title="Contributions over months"
            data={histogramData}
            width={width}
            height={height}
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
    )
}
