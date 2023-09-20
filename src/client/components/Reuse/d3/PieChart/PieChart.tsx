import React from 'react'

import PieChartWedge from './PieChartWedge'

import OverflowScroll from '@/client/components/Reuse/OverflowScroll'
import { StdMargin, StdTextSize } from '@/client/styles'
import { computePieChartSlices } from '@/client/utils/charts/computePieChartSlices'

interface PieChartProps {
    title?: string
    data: { label: string; value: number; color?: string }[]
    radius: number
    width?: number
    height?: number
}

export const PieChart: React.FC<PieChartProps> = (props) => {
    const { title, data, radius, width = 2 * radius + 18, height = 2 * radius + 18 } = props

    data.sort(({ value: value1 }, { value: value2 }) => value2 - value1)
    const sectorData: { label: string; startRadians: number; endRadians: number; color?: string }[] =
        computePieChartSlices(data)

    const cx = width / 2
    const cy = height / 2

    return (
        <OverflowScroll width={width}>
            {title !== undefined && <p className={`${StdTextSize.Small} ${StdMargin.B12}`}>{title}</p>}
            <svg width={width} height={height}>
                {sectorData.map(({ label, startRadians, endRadians, color }, idx) => {
                    return (
                        <PieChartWedge
                            key={`pie-${label}-${idx}`}
                            startRadians={startRadians}
                            endRadians={endRadians}
                            radius={radius}
                            cx={cx}
                            cy={cy}
                            color={color}
                        />
                    )
                })}
            </svg>
        </OverflowScroll>
    )
}
