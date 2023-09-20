import React, { useState } from 'react'

import PieChartTooltip from './PieChartTooltip'
import PieChartWedge from './PieChartWedge'

import OverflowScroll from '@/client/components/Reuse/OverflowScroll'
import { StdFonts, StdMargin, StdTextSize } from '@/client/styles'
import { computePieChartSlices } from '@/client/utils/charts/computePieChartSlices'

export interface PieChartData {
    label: string
    value: number
    color?: string
}

interface PieChartProps {
    title?: string
    data: PieChartData[]
    radius: number
    width?: number
    height?: number
}

export const PieChart: React.FC<PieChartProps> = (props) => {
    const { title, data, radius, width = 2 * (radius * 1.05), height = 2 * (radius * 1.05) } = props

    const [shouldShowTooltipForIdx, setShouldShowTooltipForIdx] = useState<number>()

    data.sort(({ value: value1 }, { value: value2 }) => value2 - value1)
    const sectorData: { label: string; startRadians: number; endRadians: number; color?: string }[] =
        computePieChartSlices(data)

    const cx = width / 2
    const cy = height / 2

    const handleMouseEnterForIdx = (idx: number) => setShouldShowTooltipForIdx(idx)
    const handleMouseLeave = () => setShouldShowTooltipForIdx(undefined)

    let pieChartTooltip: React.ReactElement | null = null
    if (shouldShowTooltipForIdx !== undefined) {
        const tooltipPoint = sectorData[shouldShowTooltipForIdx]
        const { label, startRadians, endRadians } = tooltipPoint
        pieChartTooltip = (
            <PieChartTooltip
                label={label}
                startRadians={startRadians}
                endRadians={endRadians}
                cx={cx}
                cy={cy}
                onMouseEnter={() => handleMouseEnterForIdx(shouldShowTooltipForIdx)}
            />
        )
    }

    return (
        <OverflowScroll width={width}>
            {title !== undefined && <p className={`${StdTextSize.Small} ${StdMargin.B12}`}>{title}</p>}
            <svg className={`${StdFonts.Secondary}`} width={width} height={height}>
                {sectorData.map(({ label, startRadians, endRadians, color }, idx) => {
                    const isHovered = idx === shouldShowTooltipForIdx

                    return (
                        <PieChartWedge
                            key={`pie-${label}-${idx}`}
                            startRadians={startRadians}
                            endRadians={endRadians}
                            radius={radius * (isHovered ? 1.03 : 1)}
                            cx={cx}
                            cy={cy}
                            color={color}
                            opacity={shouldShowTooltipForIdx !== undefined ? (isHovered ? 1 : 0.5) : 1}
                            onMouseEnter={() => handleMouseEnterForIdx(idx)}
                            onMouseLeave={handleMouseLeave}
                        />
                    )
                })}

                {pieChartTooltip}
            </svg>
        </OverflowScroll>
    )
}
