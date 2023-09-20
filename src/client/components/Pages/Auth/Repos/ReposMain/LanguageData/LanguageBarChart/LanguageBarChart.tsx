import React from 'react'

import BarChart, { BarChartData } from '@/client/components/Reuse/d3/BarChart'
import { SHARED_Model__Language } from '@/shared/models/models/Language'
import { bytesToStr } from '@/shared/utils/toBytesStr'

interface LanguageBarChartProps {
    languageData: SHARED_Model__Language[]
}

export const LanguageBarChart: React.FC<LanguageBarChartProps> = (props) => {
    const { languageData } = props

    const barChartData: BarChartData[] = languageData.map(({ name, size, color }) => {
        return { xLabel: name, y: size, barLabel: bytesToStr(size, 0), color: color }
    })

    return (
        <BarChart
            data={barChartData}
            width={590}
            height={390}
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
