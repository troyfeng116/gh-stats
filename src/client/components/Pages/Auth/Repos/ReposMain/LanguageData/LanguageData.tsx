import React from 'react'

import LanguageLegend from './LanguageLegend'

import BarChart, { BarChartData } from '@/client/components/Reuse/d3/BarChart'
import PieChart, { PieChartData } from '@/client/components/Reuse/d3/PieChart'
import { SHARED_Model__Language } from '@/shared/models/models/Language'
import { bytesToStr } from '@/shared/utils/toBytesStr'

interface LanguageDataProps {
    languageData: SHARED_Model__Language[]
    shouldSortMostFirst?: boolean
}

export const LanguageData: React.FC<LanguageDataProps> = (props) => {
    const { languageData, shouldSortMostFirst = true } = props

    if (languageData.length === 0) {
        return null
    }

    const languageDataCopy: SHARED_Model__Language[] = JSON.parse(JSON.stringify(languageData))

    if (shouldSortMostFirst) {
        languageDataCopy.sort((a, b) => b.size - a.size)
    }

    const totalLanguageBytes = languageDataCopy.reduce((totalPrev, { size }) => totalPrev + size, 0)

    const pieChartData: PieChartData[] = languageDataCopy.map(({ name, size, color }) => {
        return { label: name, value: size, color: color }
    })

    const barChartData: BarChartData[] = languageDataCopy.map(({ name, size, color }) => {
        return { xLabel: name, y: size, barLabel: bytesToStr(size, 0), color: color }
    })

    return (
        <div>
            <LanguageLegend totalLanguageBytes={totalLanguageBytes} languageData={languageDataCopy} />
            <PieChart data={pieChartData} radius={159} />
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
        </div>
    )
}
