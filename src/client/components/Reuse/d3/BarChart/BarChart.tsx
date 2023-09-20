import React from 'react'

import Axes, { AxisProperties } from '../Axes'
import BarRects from '../BarRects'

import OverflowScroll from '@/client/components/Reuse/OverflowScroll'
import { StdFonts, StdLayout, StdMargin, StdTextSize } from '@/client/styles'
import { computeBarWidth } from '@/client/utils/charts/computeBarChartBarWidth'
import { computeChartDimensionDomain } from '@/client/utils/charts/computeChartDimensionDomain'

interface BarChartProps {
    title?: string
    data: { xLabel: string; y: number; barLabel?: string; color?: string }[]
    width: number
    height: number
    padding?: [number, number, number, number]
    axisHorizontalPadding?: number
    barPadding?: number
    maxBarWidth?: number
    xAxisLabel: string
    yAxisProperties?: AxisProperties
}

export const BarChart: React.FC<BarChartProps> = (props) => {
    const {
        title,
        data,
        width,
        height,
        padding = [0, 0, 0, 0],
        axisHorizontalPadding = 39,
        barPadding = 9,
        maxBarWidth = 159,
        xAxisLabel,
        yAxisProperties,
    } = props

    const xAxisProperties: AxisProperties = {
        label: xAxisLabel,
        tickMarkOverride: data.map((__, idx) => idx),
        tickLabelMapping: (tickValue) => data[tickValue].xLabel,
    }

    const xDomain: [number, number] = [0, data.length - 1]
    const yValues = data.map(({ y }) => y)
    const yDomain = computeChartDimensionDomain(yValues, true, 0.09)

    const paddingWithAxisLabels: [number, number, number, number] = [
        padding[0] + 6,
        padding[1] + 6,
        padding[2] + 79,
        padding[3] + 60,
    ]

    const barWidth = computeBarWidth(
        data.length,
        width,
        paddingWithAxisLabels[3],
        paddingWithAxisLabels[1],
        axisHorizontalPadding,
        barPadding,
        maxBarWidth,
    )

    const axisHorizontalPaddingWithBar = barWidth / 2 + axisHorizontalPadding

    return (
        <OverflowScroll className={`${StdLayout.FlexCol}`} width={width}>
            {title !== undefined && <p className={`${StdTextSize.Small} ${StdMargin.B12}`}>{title}</p>}
            <svg width={width} height={height} className={`${StdFonts.Secondary}`}>
                <Axes
                    xDomain={xDomain}
                    yDomain={yDomain}
                    height={height}
                    width={width}
                    padding={paddingWithAxisLabels}
                    axisHorizontalPadding={axisHorizontalPaddingWithBar}
                    xAxisProperties={xAxisProperties}
                    yAxisProperties={yAxisProperties}
                />
                <BarRects
                    data={data}
                    xDomain={xDomain}
                    yDomain={yDomain}
                    width={width}
                    height={height}
                    padding={paddingWithAxisLabels}
                    axisHorizontalPadding={axisHorizontalPaddingWithBar}
                    barWidth={barWidth}
                />
            </svg>
        </OverflowScroll>
    )
}
