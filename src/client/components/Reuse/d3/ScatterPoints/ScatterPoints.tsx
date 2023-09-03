import React from 'react'
import * as d3 from 'd3'

interface ScatterPointsProps {
    data: { x: number; y: number }[]
    xDomain: [number, number]
    yDomain: [number, number]
    width: number
    height: number
    padding: [number, number, number, number]
}

export const ScatterPoints: React.FC<ScatterPointsProps> = (props) => {
    const { data, xDomain, yDomain, width, height, padding } = props
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
                return <circle key={idx} fill="white" cx={xScale(x)} cy={yScale(y)} r={6} />
            })}
        </g>
    )
}
