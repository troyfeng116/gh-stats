import React, { useState } from 'react'
import * as d3 from 'd3'

interface ScatterPointProps {
    x: number
    y: number
    r?: number
    fill?: string

    xScale: (value: d3.NumberValue) => number
    yScale: (value: d3.NumberValue) => number

    dataTooltipMapping?: (data: { x: number; y: number }) => string
}

export const ScatterPoint: React.FC<ScatterPointProps> = (props) => {
    const { x, y, r = 6, fill = 'white', xScale, yScale, dataTooltipMapping } = props

    const [shouldShowToolTip, setShouldShowTooltip] = useState<boolean>(false)

    const onMouseEnter = () => {
        setShouldShowTooltip(true)
    }

    const onMouseLeave = () => {
        setShouldShowTooltip(false)
    }

    return (
        <g style={{ transform: `translate(${xScale(x)}px, ${yScale(y)}px)` }}>
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
                        {dataTooltipMapping({ x: x, y: y })}
                    </text>
                </>
            )}
        </g>
    )
}
