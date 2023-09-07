import React from 'react'
import * as d3 from 'd3'

import Axes, { AxisProperties } from '@/client/components/Reuse/d3/Axes'
import ScatterPoints from '@/client/components/Reuse/d3/ScatterPoints'

interface HistogramProps {
    data: { points: { x: number; y: number }[]; color?: string; r?: number; lineStrokeWidth?: number }[]
    width: number
    height: number
    padding?: [number, number, number, number]
    xAxisProperties?: AxisProperties
    yAxisProperties?: AxisProperties

    dataTooltipMapping?: (data: { x: number; y: number }) => string
}

const AXIS_PADDING_RATIO = 0.1

const getHistogramDimensionDomain = (values: number[]): [number, number] => {
    /* extract min and max values from values along dimension, pad ends with AXIS_PADDING_RATIO */
    const domainRaw: [number, number] = [d3.min(values) || 0, d3.max(values) || 100]
    const rangeRaw = domainRaw[1] - domainRaw[0]
    return [domainRaw[0] - AXIS_PADDING_RATIO * rangeRaw, domainRaw[1] + AXIS_PADDING_RATIO * rangeRaw]
}

export const Histogram: React.FC<HistogramProps> = (props) => {
    const {
        data,
        width,
        height,
        padding = [18, 18, 90, 90],
        xAxisProperties,
        yAxisProperties,
        dataTooltipMapping,
    } = props

    const xValues = data.map(({ points }) => points.map(({ x }) => x)).flat(1)
    const yValues = data.map(({ points }) => points.map(({ y }) => y)).flat(1)
    const xDomain = getHistogramDimensionDomain(xValues)
    const yDomain = getHistogramDimensionDomain(yValues)

    return (
        <svg width={width} height={height}>
            <Axes
                xDomain={xDomain}
                yDomain={yDomain}
                height={height}
                width={width}
                padding={padding}
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
