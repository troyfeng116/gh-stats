import React from 'react'

import Axes, { AxisProperties } from '../Axes'
import BarRects from '../BarRects'

import { computeChartDimensionDomain } from '@/client/utils/computeChartDimensionDomain'

interface BarChartProps {
    data: { xLabel: string; y: number }[]
    width: number
    height: number
    padding?: [number, number, number, number]
    axisHorizontalPadding?: number
    xAxisLabel: string
    yAxisProperties?: AxisProperties
    color?: string
}

export const BarChart: React.FC<BarChartProps> = (props) => {
    const {
        data,
        width,
        height,
        padding = [18, 18, 90, 90],
        axisHorizontalPadding = 39,
        xAxisLabel,
        yAxisProperties,
        color = 'white',
    } = props

    const xAxisProperties: AxisProperties = {
        label: xAxisLabel,
        numTicks: data.length,
        tickLabelMapping: (tickValue) => data[tickValue].xLabel,
    }

    const xDomain: [number, number] = [0, data.length - 1]
    const yValues = data.map(({ y }) => y)
    const yDomain = computeChartDimensionDomain(yValues, true)

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
                axisHorizontalPadding={axisHorizontalPadding}
                color={color}
            />
        </svg>
    )
}
