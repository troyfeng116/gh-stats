import React from 'react'
import * as d3 from 'd3'

import { ScatterPoint } from './ScatterPoint/ScatterPoint'

interface ScatterPointsProps {
    data: { x: number; y: number }[]
    xDomain: [number, number]
    yDomain: [number, number]
    width: number
    height: number
    padding: [number, number, number, number]

    dataTooltipMapping?: (data: { x: number; y: number }) => string
}

export const ScatterPoints: React.FC<ScatterPointsProps> = (props) => {
    const { data, xDomain, yDomain, width, height, padding, dataTooltipMapping } = props
    const [paddingTop, paddingRight, paddingBottom, paddingLeft] = padding

    const xScale = d3
        .scaleLinear()
        .domain(xDomain)
        .range([paddingLeft, width - paddingRight])
    const yScale = d3
        .scaleLinear()
        .domain(yDomain)
        .range([height - paddingBottom, paddingTop])

    return (
        <g>
            {data.map(({ x, y }, idx) => {
                return (
                    <ScatterPoint
                        key={idx}
                        x={x}
                        y={y}
                        xScale={xScale}
                        yScale={yScale}
                        r={6}
                        fill="white"
                        dataTooltipMapping={dataTooltipMapping}
                    />
                )
            })}
        </g>
    )
}
