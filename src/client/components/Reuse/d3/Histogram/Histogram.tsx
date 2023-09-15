import React from 'react'

import Axes, { AxisProperties } from '@/client/components/Reuse/d3/Axes'
import ScatterPoints from '@/client/components/Reuse/d3/ScatterPoints'
import { computeChartDimensionDomain } from '@/client/utils/charts/computeChartDimensionDomain'

interface HistogramProps {
    data: { points: { x: number; y: number }[]; color?: string; r?: number; lineStrokeWidth?: number }[]
    width: number
    height: number
    padding?: [number, number, number, number]
    axisHorizontalPadding?: number
    xAxisProperties?: AxisProperties
    yAxisProperties?: AxisProperties

    dataTooltipMapping?: (data: { x: number; y: number }) => string
}

export const Histogram: React.FC<HistogramProps> = (props) => {
    const {
        data,
        width,
        height,
        padding = [18, 18, 90, 90],
        axisHorizontalPadding = 39,
        xAxisProperties,
        yAxisProperties,
        dataTooltipMapping,
    } = props

    const xValues = data.map(({ points }) => points.map(({ x }) => x)).flat(1)
    const yValues = data.map(({ points }) => points.map(({ y }) => y)).flat(1)
    const xDomain = computeChartDimensionDomain(xValues)
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
            {data.map(({ points, color, r, lineStrokeWidth }, idx) => {
                return (
                    <ScatterPoints
                        key={`scatter-points-${idx}`}
                        points={points}
                        xDomain={xDomain}
                        yDomain={yDomain}
                        width={width}
                        height={height}
                        axisHorizontalPadding={axisHorizontalPadding}
                        padding={padding}
                        includeLines={true}
                        color={color}
                        r={r}
                        lineStrokeWidth={lineStrokeWidth}
                        dataTooltipMapping={dataTooltipMapping}
                    />
                )
            })}
        </svg>
    )
}
