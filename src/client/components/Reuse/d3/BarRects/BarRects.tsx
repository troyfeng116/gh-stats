import React from 'react'
import * as d3 from 'd3'

import { BarChartData } from '../BarChart'

import BarRect from './BarRect'

interface BarRectsProps {
    data: BarChartData[]
    xDomain: [number, number]
    yDomain: [number, number]
    width: number
    height: number
    padding: [number, number, number, number]
    axisHorizontalPadding: number
    barWidth: number
}

export const BarRects: React.FC<BarRectsProps> = (props) => {
    const { data, xDomain, yDomain, width, height, padding, axisHorizontalPadding, barWidth } = props
    const [paddingTop, paddingRight, paddingBottom, paddingLeft] = padding

    const xScale = d3
        .scaleLinear()
        .domain(xDomain)
        .range([paddingLeft + axisHorizontalPadding, width - paddingRight - axisHorizontalPadding])
    const heightScale = d3
        .scaleLinear()
        .domain(yDomain)
        .range([0, height - paddingBottom - paddingTop])

    return (
        <g>
            {data.map(({ xLabel, y, barLabel, color = 'white' }, idx) => {
                return (
                    <BarRect
                        key={`${xLabel}-y-${idx}`}
                        xCenter={xScale(idx)}
                        yStart={height - paddingBottom}
                        width={barWidth}
                        height={heightScale(y)}
                        color={color}
                        label={barLabel}
                    />
                )
            })}
        </g>
    )
}
