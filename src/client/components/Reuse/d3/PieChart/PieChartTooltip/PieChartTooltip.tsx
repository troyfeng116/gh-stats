import React from 'react'

interface PieChartTooltipProps {
    label: string
    startRadians: number
    endRadians: number
    cx: number
    cy: number
}

export const PieChartTooltip: React.FC<PieChartTooltipProps> = (props) => {
    const { label, startRadians, endRadians, cx, cy } = props

    const centerAngleRadians = (startRadians + endRadians) / 2
    const x = cx + 24 * Math.cos(centerAngleRadians)
    const y = cy - 24 * Math.sin(centerAngleRadians)

    return (
        <g style={{ transform: `translate(${x}px, ${y}px)` }}>
            <rect fill="white" x={0} y={0} width={260} height={36} style={{ transform: 'translate(-130px)' }} />
            <text textAnchor="middle" fill="black" style={{ fontSize: 12, transform: 'translateY(21px)' }}>
                {label}
            </text>
        </g>
    )
}
