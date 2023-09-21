import React from 'react'
import { IconType } from 'react-icons'
import { FaChartBar, FaChartLine, FaChartPie } from 'react-icons/fa'

import { StdCursor, StdLayout, StdPadding } from '@/client/styles'

export enum ChartType {
    Histogram = 'Histogram',
    Bar = 'Bar',
    Pie = 'Pie',
}

interface ChartButtonsProps {
    chartTypes: ChartType[]
    selectedChartType?: ChartType

    handleChartTypeClicked: (chartType: ChartType) => void
}

const CHART_TYPE_TO_ICON: { [key in ChartType]: IconType } = {
    [ChartType.Histogram]: FaChartLine,
    [ChartType.Bar]: FaChartBar,
    [ChartType.Pie]: FaChartPie,
}

export const ChartButtons: React.FC<ChartButtonsProps> = (props) => {
    const { chartTypes, selectedChartType, handleChartTypeClicked } = props

    return (
        <div className={`${StdLayout.FlexRow}`} style={{ border: '3px solid rgb(139, 139, 139)' }}>
            {chartTypes.map((chartType, idx) => {
                const isSelected = chartType === selectedChartType
                return (
                    <div
                        key={`chart-btns-${idx}`}
                        className={`${StdLayout.FlexRowCenter} ${StdCursor.Clickable} ${StdPadding.All6}`}
                        style={{
                            width: 60,
                            backgroundColor: isSelected ? 'rgb(129, 249, 209)' : 'rgb(139, 139, 139)',
                        }}
                        onClick={() => handleChartTypeClicked(chartType)}
                    >
                        {CHART_TYPE_TO_ICON[chartType]({ size: 21, color: 'black' })}
                    </div>
                )
            })}
        </div>
    )
}
