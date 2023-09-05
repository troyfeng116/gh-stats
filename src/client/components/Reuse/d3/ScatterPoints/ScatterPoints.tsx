import React from 'react'
import * as d3 from 'd3'

import { ScatterPoint } from './ScatterPoint/ScatterPoint'

import { computeScatterLineEndpoints } from '@/client/utils/computeScatterLineEndpoints'

interface ScatterPointsProps {
    data: { x: number; y: number }[]
    xDomain: [number, number]
    yDomain: [number, number]
    width: number
    height: number
    padding: [number, number, number, number]
    includeLines?: boolean

    dataTooltipMapping?: (data: { x: number; y: number }) => string
}

export const ScatterPoints: React.FC<ScatterPointsProps> = (props) => {
    const { data, xDomain, yDomain, width, height, padding, includeLines = false, dataTooltipMapping } = props
    const [paddingTop, paddingRight, paddingBottom, paddingLeft] = padding

    const xScale = d3
        .scaleLinear()
        .domain(xDomain)
        .range([paddingLeft, width - paddingRight])
    const yScale = d3
        .scaleLinear()
        .domain(yDomain)
        .range([height - paddingBottom, paddingTop])

    const scaledData: { x: number; y: number }[] = data.map(({ x, y }) => {
        return { x: xScale(x), y: yScale(y) }
    })

    const lineEndpoints = computeScatterLineEndpoints(scaledData)

    return (
        <g>
            {includeLines &&
                lineEndpoints.map(({ x1, y1, x2, y2 }, idx) => {
                    return (
                        <line
                            key={`scatter-line-${idx}`}
                            x1={x1}
                            y1={y1}
                            x2={x2}
                            y2={y2}
                            fill="white"
                            stroke="currentColor"
                            strokeWidth={2}
                        />
                    )
                })}

            {data.map(({ x, y }, idx) => {
                return (
                    <ScatterPoint
                        key={`scatter-pt-${idx}`}
                        x={xScale(x)}
                        y={yScale(y)}
                        xData={x}
                        yData={y}
                        r={5}
                        fill="white"
                        dataTooltipMapping={dataTooltipMapping}
                    />
                )
            })}
        </g>
    )
}
