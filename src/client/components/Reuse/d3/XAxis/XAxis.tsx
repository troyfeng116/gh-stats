import React, { useMemo } from 'react'
import * as d3 from 'd3'

import { AxisProperties } from '../Axes'

interface XAxisProps {
    domain: [number, number]
    xStart: number
    xEnd: number
    yOffset: number
    axisProperties?: AxisProperties
}

export const XAxis: React.FC<XAxisProps> = (props) => {
    const { domain, xStart, xEnd, yOffset, axisProperties } = props
    const {
        label = 'X axis',
        numTicks = 10,
        tickLabelMapping = (tickValue: number) => tickValue.toString(),
    } = axisProperties || { label: undefined, numTicks: undefined, tickLabelMapping: undefined }

    const xTicks = useMemo(() => {
        const xScale = d3.scaleLinear().domain(domain).range([xStart, xEnd])

        return xScale.ticks(numTicks).map((value) => ({
            value,
            xOffset: xScale(value),
        }))
    }, [domain, xStart, xEnd, numTicks])

    return (
        <g color="white" stroke="currentColor">
            <text
                style={{
                    fontSize: '15px',
                    textAnchor: 'middle',
                    transform: `translate(${(xStart + xEnd) / 2}px, ${yOffset + 72}px)`,
                }}
            >
                {label}
            </text>
            <line x1={xStart} y1={yOffset} x2={xEnd} y2={yOffset} strokeWidth={2} />
            {xTicks.map(({ value, xOffset }) => (
                <g key={value} transform={`translate(${xOffset}, ${yOffset})`}>
                    <line y1="0" y2="6" strokeWidth={2} />
                    <text
                        key={value}
                        style={{
                            fontSize: '12px',
                            textAnchor: 'end',
                            transform: 'translateY(19px) rotate(-22.9deg)',
                        }}
                    >
                        {tickLabelMapping(value)}
                    </text>
                </g>
            ))}
        </g>
    )
}
