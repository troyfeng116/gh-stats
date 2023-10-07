import React from 'react'

import BarChart, { BarChartData } from '@/client/components/Reuse/d3/BarChart'
import { kbToStr } from '@/shared/utils/toBytesStr'

interface DiskUsageBarChartProps {
    diskUsageData: { repoName: string; repoKey: string; diskUsage: number; color: string }[]
    width: number
    height: number
}

export const DiskUsageBarChart: React.FC<DiskUsageBarChartProps> = (props) => {
    const { diskUsageData, width, height } = props

    const barChartData: BarChartData[] = diskUsageData.map(({ repoName, diskUsage, color }) => {
        return { xLabel: repoName, y: diskUsage, barLabel: kbToStr(diskUsage, 0), color: color }
    })

    return (
        <BarChart
            data={barChartData}
            width={width}
            height={height}
            barPadding={0}
            axisHorizontalPadding={19}
            xAxisLabel="Repository name"
            yAxisProperties={{
                label: 'Space',
                tickLabelMapping: (tickValue) => kbToStr(tickValue, 0),
            }}
        />
    )
}
