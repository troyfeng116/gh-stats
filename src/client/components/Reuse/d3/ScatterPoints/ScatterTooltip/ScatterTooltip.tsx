import React from 'react'

interface ScatterTooltipProps {
    cx: number
    cy: number
    text: string
}

export const ScatterTooltip: React.FC<ScatterTooltipProps> = (props) => {
    const { cx, cy, text } = props

    return (
        <g style={{ transform: `translate(${cx}px, ${cy}px)` }}>
            <rect
                fill="white"
                x={0}
                y={0}
                width={190}
                height={36}
                rx={6}
                style={{ transform: 'translate(-95px, 12px)' }}
            />
            <text
                fill="black"
                style={{
                    fontSize: '12px',
                    textAnchor: 'middle',
                    transform: 'translateY(33px)',
                }}
            >
                {text}
            </text>
        </g>
    )
}
