import React, { useState } from 'react'
import * as d3 from 'd3'

import { ScatterPoint } from './ScatterPoint/ScatterPoint'
import ScatterTooltip from './ScatterTooltip'

import { computeScatterLineEndpoints } from '@/client/utils/computeScatterLineEndpoints'

interface ScatterPointsProps {
    points: { x: number; y: number }[]
    xDomain: [number, number]
    yDomain: [number, number]
    width: number
    height: number
    padding: [number, number, number, number]
    includeLines?: boolean
    color?: string
    r?: number
    lineStrokeWidth?: number

    dataTooltipMapping?: (data: { x: number; y: number }) => string
}

export const ScatterPoints: React.FC<ScatterPointsProps> = (props) => {
    const {
        points,
        xDomain,
        yDomain,
        width,
        height,
        padding,
        includeLines = false,
        color = 'white',
        r = 5,
        lineStrokeWidth = 2,
        dataTooltipMapping,
    } = props
    const [paddingTop, paddingRight, paddingBottom, paddingLeft] = padding

    const [showTooltipForIdx, setShowTooltipForIdx] = useState<number>()

    const xScale = d3
        .scaleLinear()
        .domain(xDomain)
        .range([paddingLeft, width - paddingRight])
    const yScale = d3
        .scaleLinear()
        .domain(yDomain)
        .range([height - paddingBottom, paddingTop])

    const scaledData: { x: number; y: number }[] = points.map(({ x, y }) => {
        return { x: xScale(x), y: yScale(y) }
    })

    const lineEndpoints = computeScatterLineEndpoints(scaledData)

    let scatterTooltip: React.ReactElement | null = null
    if (dataTooltipMapping !== undefined && showTooltipForIdx !== undefined) {
        const tooltipPoint = points[showTooltipForIdx]
        scatterTooltip = (
            <ScatterTooltip
                text={dataTooltipMapping(tooltipPoint)}
                cx={xScale(tooltipPoint.x)}
                cy={yScale(tooltipPoint.y)}
            />
        )
    }

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
                            color={color}
                            stroke="currentColor"
                            strokeWidth={lineStrokeWidth}
                        />
                    )
                })}

            {points.map(({ x, y }, idx) => {
                return (
                    <ScatterPoint
                        key={`scatter-pt-${idx}`}
                        cx={xScale(x)}
                        cy={yScale(y)}
                        r={r}
                        fill={color}
                        onMouseEnter={() => setShowTooltipForIdx(idx)}
                        onMouseLeave={() => setShowTooltipForIdx(undefined)}
                    />
                )
            })}

            {scatterTooltip}
        </g>
    )
}
