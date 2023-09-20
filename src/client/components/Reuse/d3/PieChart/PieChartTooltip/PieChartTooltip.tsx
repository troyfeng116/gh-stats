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
    const x = cx + 60 * Math.cos(centerAngleRadians)
    const y = cy - 60 * Math.sin(centerAngleRadians)

    return (
        <g style={{ transform: `translate(${x}px, ${y}px)` }} onMouseEnter={onMouseEnter}>
            <rect fill="white" x={0} y={0} width={290} height={36} style={{ transform: 'translate(-145px)' }} />
            <text textAnchor="middle" fill="black" style={{ fontSize: 12, transform: 'translateY(21px)' }}>
                {label}
            </text>
        </g>
    )
}
