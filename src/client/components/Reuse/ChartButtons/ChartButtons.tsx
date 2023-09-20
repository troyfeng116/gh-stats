import React from 'react'
import { IconType } from 'react-icons'
import { FaChartBar, FaChartLine, FaChartPie } from 'react-icons/fa'

import Button from '@/client/components/Reuse/Button'
import { StdLayout } from '@/client/styles'

export enum ChartType {
    Histogram = 'Histogram',
    Bar = 'Bar',
    Pie = 'Pie',
}

interface ChartButtonsProps {
    chartTypes: ChartType[]
    handleChartTypeClicked: (chartType: ChartType) => void
}

const CHART_TYPE_TO_ICON: { [key in ChartType]: IconType } = {
    [ChartType.Histogram]: FaChartLine,
    [ChartType.Bar]: FaChartBar,
    [ChartType.Pie]: FaChartPie,
}

export const ChartButtons: React.FC<ChartButtonsProps> = (props) => {
    const { chartTypes, handleChartTypeClicked } = props

    return (
        <div className={`${StdLayout.FlexRow}`}>
            {chartTypes.map((chartType, idx) => {
                return (
                    <Button
                        key={`chart-btns-${idx}`}
                        className={`${StdLayout.FlexRowCenter}`}
                        onClick={() => handleChartTypeClicked(chartType)}
                    >
                        {CHART_TYPE_TO_ICON[chartType]({ size: 18 })}
                    </Button>
                )
            })}
        </div>
    )
}
