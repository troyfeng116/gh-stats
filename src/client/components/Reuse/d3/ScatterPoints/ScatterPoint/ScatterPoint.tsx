import React from 'react'

interface ScatterPointProps {
    cx: number
    cy: number
    r?: number
    fill?: string

    onMouseEnter?: React.MouseEventHandler<SVGCircleElement>
    onMouseLeave?: React.MouseEventHandler<SVGCircleElement>
}

export const ScatterPoint: React.FC<ScatterPointProps> = (props) => {
    const { cx, cy, r = 6, fill = 'white', onMouseEnter, onMouseLeave } = props

    return (
        <g style={{ transform: `translate(${cx}px, ${cy}px)` }} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
            <circle fill={fill} cx={0} cy={0} r={9} fillOpacity={0} />
            <circle r={r} cx={0} cy={0} fill={fill} />
        </g>
    )
}
