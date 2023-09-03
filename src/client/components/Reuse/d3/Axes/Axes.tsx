import React from 'react'

import XAxis from '../XAxis'
import YAxis from '../YAxis'

export interface AxisProperties {
    label: string
    numTicks?: number
    tickLabelMapping?: (tickValue: number) => string
}

interface AxesProps {
    xDomain: [number, number]
    yDomain: [number, number]
    width: number
    height: number
    padding: [number, number, number, number]
    xAxisProperties?: AxisProperties
    yAxisProperties?: AxisProperties
}

export const Axes: React.FC<AxesProps> = (props) => {
    const { xDomain, yDomain, width, height, padding, xAxisProperties, yAxisProperties } = props

    const [paddingTop, paddingRight, paddingBottom, paddingLeft] = padding
    const xAxisStart = paddingLeft,
        xAxisEnd = width - paddingRight
    const yAxisStart = paddingTop,
        yAxisEnd = height - paddingBottom

    return (
        <>
            <XAxis
                domain={xDomain}
                xStart={xAxisStart}
                xEnd={xAxisEnd}
                yOffset={yAxisEnd}
                axisProperties={xAxisProperties}
            />
            <YAxis
                range={yDomain}
                yStart={yAxisStart}
                yEnd={yAxisEnd}
                xOffset={xAxisStart}
                axisProperties={yAxisProperties}
            />
        </>
    )
}
