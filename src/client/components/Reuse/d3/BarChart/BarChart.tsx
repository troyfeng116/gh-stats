import React from 'react'

import Axes, { AxisProperties } from '../Axes'
import BarRects from '../BarRects'

import { computeChartDimensionDomain } from '@/client/utils/charts/computeChartDimensionDomain'

interface BarChartProps {
    data: { xLabel: string; y: number; color?: string }[]
    width: number
    height: number
    padding?: [number, number, number, number]
    axisHorizontalPadding?: number
    barPadding?: number
    xAxisLabel: string
    yAxisProperties?: AxisProperties
}

export const BarChart: React.FC<BarChartProps> = (props) => {
    const {
        data,
        width,
        height,
        padding = [18, 18, 90, 90],
        axisHorizontalPadding = 39,
        barPadding = 9,
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

    return (
        <svg width={width} height={height}>
            <Axes
                xDomain={xDomain}
                yDomain={yDomain}
                height={height}
                width={width}
                padding={padding}
                axisHorizontalPadding={axisHorizontalPadding}
                xAxisProperties={xAxisProperties}
                yAxisProperties={yAxisProperties}
            />
            <BarRects
                data={data}
                xDomain={xDomain}
                yDomain={yDomain}
                width={width}
                height={height}
                padding={padding}
                barPadding={barPadding}
                axisHorizontalPadding={axisHorizontalPadding}
            />
        </svg>
    )
}
