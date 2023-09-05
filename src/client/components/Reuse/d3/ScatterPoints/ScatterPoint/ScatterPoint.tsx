import React, { useState } from 'react'

interface ScatterPointProps {
    x: number
    y: number
    xData: number
    yData: number
    r?: number
    fill?: string

    dataTooltipMapping?: (data: { x: number; y: number }) => string
}

export const ScatterPoint: React.FC<ScatterPointProps> = (props) => {
    const { x, y, xData, yData, r = 6, fill = 'white', dataTooltipMapping } = props

    const [shouldShowToolTip, setShouldShowTooltip] = useState<boolean>(false)

    const onMouseEnter = () => {
        setShouldShowTooltip(true)
    }

    const onMouseLeave = () => {
        setShouldShowTooltip(false)
    }

    return (
        <g style={{ transform: `translate(${x}px, ${y}px)` }}>
            <circle fill={fill} cx={0} cy={0} r={r} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} />

            {dataTooltipMapping !== undefined && shouldShowToolTip && (
                <>
                    <rect
                        fill="white"
                        x={0}
                        y={0}
                        width={190}
                        height={36}
                        style={{ transform: 'translate(-95px, 9px)' }}
                    ></rect>
                    <text
                        fill="black"
                        style={{
                            fontSize: '12px',
                            textAnchor: 'middle',
                            transform: 'translateY(30px)',
                            padding: '3px 6px',
                        }}
                    >
                        {dataTooltipMapping({ x: xData, y: yData })}
                    </text>
                </>
            )}
        </g>
    )
}
