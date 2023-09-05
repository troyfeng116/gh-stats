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

    return <circle fill={fill} cx={cx} cy={cy} r={r} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} />
}
