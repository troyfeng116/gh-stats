import React from 'react'

interface BarRectProps {
    xCenter: number
    yStart: number
    height: number
    width: number
    color: string
    label?: string
}

export const BarRect: React.FC<BarRectProps> = (props) => {
    const { xCenter, yStart, height, width, color, label } = props

    return (
        <g>
            {label !== undefined && (
                <text
                    fill="white"
                    x={xCenter}
                    y={yStart - height - 3}
                    style={{
                        fontSize: '12px',
                        textAnchor: 'middle',
                    }}
                >
                    {label}
                </text>
            )}
            <rect
                fill={color}
                stroke="currentColor"
                x={xCenter - width / 2}
                y={yStart - height}
                width={width}
                height={height}
            />
        </g>
    )
}
