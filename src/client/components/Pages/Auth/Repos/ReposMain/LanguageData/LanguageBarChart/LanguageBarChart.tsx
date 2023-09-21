import React from 'react'

import BarChart, { BarChartData } from '@/client/components/Reuse/d3/BarChart'
import { SHARED_Model__Language } from '@/shared/models/models/Language'
import { bytesToStr } from '@/shared/utils/toBytesStr'

interface LanguageBarChartProps {
    languageData: SHARED_Model__Language[]
    width: number
    height: number
    title?: string
}

export const LanguageBarChart: React.FC<LanguageBarChartProps> = (props) => {
    const { languageData, width, height, title } = props

    const barChartData: BarChartData[] = languageData.map(({ name, size, color }) => {
        return { xLabel: name, y: size, barLabel: bytesToStr(size, 0), color: color }
    })

    return (
        <BarChart
            title={title}
            data={barChartData}
            width={width}
            height={height}
            barPadding={0}
            axisHorizontalPadding={19}
            xAxisLabel="Language"
            yAxisProperties={{
                label: 'Space',
                tickLabelMapping: (tickValue) => bytesToStr(tickValue, 0),
            }}
        />
    )
}
