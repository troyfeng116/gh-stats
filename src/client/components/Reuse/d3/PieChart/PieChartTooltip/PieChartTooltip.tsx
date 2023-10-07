import React from 'react'

interface PieChartTooltipProps {
    label: string
    startRadians: number
    endRadians: number
    cx: number
    cy: number

    onMouseEnter?: React.MouseEventHandler<SVGGElement>
}

export const PieChartTooltip: React.FC<PieChartTooltipProps> = (props) => {
    const { label, startRadians, endRadians, cx, cy, onMouseEnter } = props

    const centerAngleRadians = (startRadians + endRadians) / 2
    const x = cx + 48 * Math.cos(centerAngleRadians)
    const y = cy - 48 * Math.sin(centerAngleRadians)

    const width = label.length * 7 + 60

    return (
        <g style={{ transform: `translate(${x}px, ${y}px)` }} onMouseEnter={onMouseEnter}>
            <rect
                fill="white"
                x={0}
                y={0}
                width={width}
                height={36}
                style={{ transform: `translate(-${width / 2}px)` }}
            />
            <text textAnchor="middle" fill="black" style={{ fontSize: 12, transform: 'translateY(21px)' }}>
                {label}
            </text>
        </g>
    )
}
