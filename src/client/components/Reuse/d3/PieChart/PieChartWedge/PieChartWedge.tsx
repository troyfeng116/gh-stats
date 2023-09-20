import React from 'react'

interface PieChartWedge {
    startRadians: number
    endRadians: number
    radius: number
    cx: number
    cy: number
    color?: string
}

export const PieChartWedge: React.FC<PieChartWedge> = (props) => {
    const { startRadians, endRadians, radius, cx, cy, color = 'white' } = props

    if (Math.abs(endRadians - startRadians) === 2 * Math.PI) {
        return <circle cx={cx} cy={cy} r={radius} fill={color} />
    }

    const x1 = cx + radius * Math.cos(startRadians)
    const y1 = cy - radius * Math.sin(startRadians)

    const x2 = cx + radius * Math.cos(endRadians)
    const y2 = cy - radius * Math.sin(endRadians)

    const largeArcFlag = Math.abs(endRadians - startRadians) >= Math.PI ? 1 : 0

    // http://xahlee.info/js/svg_path_ellipse_arc.html
    const dArr = ['M', x1, y1, 'A', radius, radius, 0, largeArcFlag, 0, x2, y2, 'L', cx, cy, 'Z']

    return <path d={dArr.join(' ')} fill={color} />
}
