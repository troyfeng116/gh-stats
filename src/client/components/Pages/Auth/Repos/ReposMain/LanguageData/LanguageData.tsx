import React, { useState } from 'react'

import LanguageBarChart from './LanguageBarChart'
import LanguageLegend from './LanguageLegend'
import LanguagePieChart from './LanguagePieChart'

import ChartButtons, { ChartType } from '@/client/components/Reuse/ChartButtons'
import { SHARED_Model__Language } from '@/shared/models/models/Language'

interface LanguageDataProps {
    languageData: SHARED_Model__Language[]
    shouldSortMostFirst?: boolean
}

export const LanguageData: React.FC<LanguageDataProps> = (props) => {
    const { languageData, shouldSortMostFirst = true } = props

    const chartTypes = [ChartType.Bar, ChartType.Pie]
    const [chartTypeToDisplay, setChartTypeToDisplay] = useState<ChartType>(ChartType.Bar)

    if (languageData.length === 0) {
        return null
    }

    const languageDataCopy: SHARED_Model__Language[] = JSON.parse(JSON.stringify(languageData))

    if (shouldSortMostFirst) {
        languageDataCopy.sort((a, b) => b.size - a.size)
    }

    const totalLanguageBytes = languageDataCopy.reduce((totalPrev, { size }) => totalPrev + size, 0)

    let chartComponent: React.ReactNode | null = null
    switch (chartTypeToDisplay) {
        case ChartType.Bar:
            chartComponent = <LanguageBarChart languageData={languageDataCopy} />
            break
        case ChartType.Pie:
            chartComponent = (
                <LanguagePieChart totalLanguageBytes={totalLanguageBytes} languageData={languageDataCopy} />
            )
            break
    }

    return (
        <div>
            <ChartButtons
                chartTypes={chartTypes}
                handleChartTypeClicked={(chartType) => setChartTypeToDisplay(chartType)}
            />
            <LanguageLegend totalLanguageBytes={totalLanguageBytes} languageData={languageDataCopy} />
            {chartComponent}
        </div>
    )
}
