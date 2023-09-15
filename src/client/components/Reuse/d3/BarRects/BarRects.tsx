import React from 'react'
import * as d3 from 'd3'

import BarRect from './BarRect'

interface BarRectsProps {
    data: { xLabel: string; y: number }[]
    xDomain: [number, number]
    yDomain: [number, number]
    width: number
    height: number
    padding: [number, number, number, number]
    axisHorizontalPadding: number
    color: string
}

export const BarRects: React.FC<BarRectsProps> = (props) => {
    const { data, xDomain, yDomain, width, height, padding, axisHorizontalPadding, color } = props
    const [paddingTop, paddingRight, paddingBottom, paddingLeft] = padding

    const barPadding = 0
    const numBars = data.length
    const xScale = d3
        .scaleLinear()
        .domain(xDomain)
        .range([paddingLeft + axisHorizontalPadding, width - paddingRight - axisHorizontalPadding])
    const heightScale = d3
        .scaleLinear()
        .domain(yDomain)
        .range([0, height - paddingBottom - paddingTop])
    const barWidth =
        (width - paddingRight - paddingLeft - 2 * axisHorizontalPadding - barPadding * (numBars - 1)) / numBars

    return (
        <g>
            {data.map(({ xLabel, y }, idx) => {
                return (
                    <BarRect
                        key={`${xLabel}-y-${idx}`}
                        xCenter={xScale(idx)}
                        yStart={height - paddingBottom}
                        width={barWidth}
                        height={heightScale(y)}
                        color={color}
                    />
                )
            })}
        </g>
    )
}