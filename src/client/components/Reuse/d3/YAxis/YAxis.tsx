import React, { useMemo } from 'react'
import * as d3 from 'd3'

import { AxisProperties } from '../Axes'

interface YAxisProps {
    range: [number, number]
    yStart: number
    yEnd: number
    xOffset: number
    axisProperties: AxisProperties
}

export const YAxis: React.FC<YAxisProps> = (props) => {
    const { range, yStart, yEnd, xOffset, axisProperties } = props
    const { label = 'X axis', numTicks = 10, tickLabelMapping = (tickValue) => tickValue.toString() } = axisProperties

    const yTicks = useMemo(() => {
        const yScale = d3.scaleLinear().domain(range).range([yEnd, yStart])

        return yScale.ticks(numTicks).map((value) => ({
            value,
            yOffset: yScale(value),
        }))
    }, [range, yStart, yEnd, numTicks])

    return (
        <g color="white" stroke="currentColor">
            <text
                style={{
                    fontSize: '15px',
                    textAnchor: 'middle',
                    transform: `translate(${xOffset - 42}px, ${(yStart + yEnd) / 2}px) rotate(270deg)`,
                }}
            >
                {label}
            </text>
            <line x1={xOffset} y1={yStart} x2={xOffset} y2={yEnd} />
            {yTicks.map(({ value, yOffset }) => (
                <g key={value} transform={`translate(${xOffset}, ${yOffset})`}>
                    <line x1="-6" x2="0" />
                    <text
                        key={value}
                        style={{
                            fontSize: '12px',
                            textAnchor: 'end',
                            alignmentBaseline: 'central',
                            transform: 'translateX(-12px)',
                        }}
                    >
                        {tickLabelMapping(value)}
                    </text>
                </g>
            ))}
        </g>
    )
}
