import React, { useState } from 'react'

import DiskUsageBarChart from './DiskUsageBarChart'
import DiskUsageLegend from './DiskUsageLegend'
import DiskUsagePieChart from './DiskUsagePieChart'

import Card, { CardType } from '@/client/components/Reuse/Card'
import ChartButtons, { ChartType } from '@/client/components/Reuse/ChartButtons'
import { StdLayout, StdMargin, StdPadding } from '@/client/styles'
import { extractDiskUsageData } from '@/client/utils/charts/extractDiskUsageData'
import { SHARED_Model__RepoWithCommitCounts } from '@/shared/models/models/Repos'

interface DiskUsageDataProps {
    repoData: SHARED_Model__RepoWithCommitCounts[]
    shouldSortMostFirst?: boolean
    chartWidth?: number
    chartHeight?: number
}

export const DiskUsageData: React.FC<DiskUsageDataProps> = (props) => {
    const { repoData, shouldSortMostFirst = true, chartWidth = 690, chartHeight = 390 } = props

    const chartTypes = [ChartType.Bar, ChartType.Pie]
    const [chartTypeToDisplay, setChartTypeToDisplay] = useState<ChartType>(ChartType.Bar)

    if (repoData.length === 0) {
        return null
    }

    const repoDataCopy: SHARED_Model__RepoWithCommitCounts[] = JSON.parse(JSON.stringify(repoData))

    if (shouldSortMostFirst) {
        repoDataCopy.sort((a, b) => b.diskUsage - a.diskUsage)
    }

    const repoDiskUsageData: { repoName: string; repoKey: string; diskUsage: number; color: string }[] =
        extractDiskUsageData(repoDataCopy)

    const totalDiskUsage = repoDiskUsageData.reduce((totalPrev, { diskUsage }) => totalPrev + diskUsage, 0)

    let chartComponent: React.ReactNode | null = null
    switch (chartTypeToDisplay) {
        case ChartType.Bar:
            chartComponent = (
                <DiskUsageBarChart
                    diskUsageData={repoDiskUsageData.slice(0, 19)}
                    width={chartWidth}
                    height={chartHeight}
                />
            )
            break
        case ChartType.Pie:
            chartComponent = (
                <DiskUsagePieChart
                    totalDiskUsage={totalDiskUsage}
                    diskUsageData={repoDiskUsageData}
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
                    <DiskUsageLegend totalDiskUsage={totalDiskUsage} diskUsageData={repoDiskUsageData} />
                </div>

                {chartComponent}
            </Card>
        </div>
    )
}
