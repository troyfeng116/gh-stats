import React from 'react'

import PieChart, { PieChartData } from '@/client/components/Reuse/d3/PieChart'
import { kbToStr } from '@/shared/utils/toBytesStr'
import { toPercent } from '@/shared/utils/toPercent'

interface DiskUsagePieChartProps {
    totalDiskUsage: number
    diskUsageData: { repoName: string; repoKey: string; diskUsage: number; color: string }[]
    width: number
    height: number
}

export const DiskUsagePieChart: React.FC<DiskUsagePieChartProps> = (props) => {
    const { width, height, totalDiskUsage, diskUsageData } = props

    const pieChartData: PieChartData[] = diskUsageData.map(({ repoName, diskUsage, color }) => {
        return {
            label: `${repoName} (${toPercent(diskUsage, totalDiskUsage)}%, ${kbToStr(diskUsage, 2)})`,
            value: diskUsage,
            color: color,
        }
    })

    return <PieChart data={pieChartData} width={width} height={height} radius={159} />
}
