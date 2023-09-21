import React, { useState } from 'react'

import LanguageBarChart from './LanguageBarChart'
import LanguageLegend from './LanguageLegend'
import LanguagePieChart from './LanguagePieChart'

import Card, { CardType } from '@/client/components/Reuse/Card'
import ChartButtons, { ChartType } from '@/client/components/Reuse/ChartButtons'
import { StdLayout, StdMargin, StdPadding } from '@/client/styles'
import { SHARED_Model__Language } from '@/shared/models/models/Language'

interface LanguageDataProps {
    languageData: SHARED_Model__Language[]
    shouldSortMostFirst?: boolean
    chartWidth?: number
    chartHeight?: number
}

export const LanguageData: React.FC<LanguageDataProps> = (props) => {
    const { languageData, shouldSortMostFirst = true, chartWidth = 690, chartHeight = 390 } = props

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
            chartComponent = (
                <LanguageBarChart languageData={languageDataCopy} width={chartWidth} height={chartHeight} />
            )
            break
        case ChartType.Pie:
            chartComponent = (
                <LanguagePieChart
                    totalLanguageBytes={totalLanguageBytes}
                    languageData={languageDataCopy}
                    width={chartWidth}
                    height={chartHeight}
                />
            )
            break
    }

    return (
        <div className={`${StdLayout.FlexCol}`}>
            <ChartButtons
                chartTypes={chartTypes}
                selectedChartType={chartTypeToDisplay}
                handleChartTypeClicked={(chartType) => setChartTypeToDisplay(chartType)}
            />

            <Card
                className={`${StdMargin.T30} ${StdLayout.FlexCol}`}
                type={CardType.Tertiary}
                padding={StdPadding.All18}
            >
                <div className={`${StdMargin.B30}`}>
                    <LanguageLegend totalLanguageBytes={totalLanguageBytes} languageData={languageDataCopy} />
                </div>

                {chartComponent}
            </Card>
        </div>
    )
}
