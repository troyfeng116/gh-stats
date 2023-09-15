import React from 'react'

interface BarRectProps {
    xCenter: number
    yStart: number
    height: number
    width: number
    color: string
}

export const BarRect: React.FC<BarRectProps> = (props) => {
    const { xCenter, yStart, height, width, color } = props

    return (
        <rect
            fill={color}
            stroke="currentColor"
            x={xCenter - width / 2}
            y={yStart - height}
            width={width}
            height={height}
        />
    )
}
