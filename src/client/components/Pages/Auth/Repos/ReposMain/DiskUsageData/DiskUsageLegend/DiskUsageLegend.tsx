import React from 'react'

import Legend, { LegendData } from '@/client/components/Reuse/Legend'
import { kbToStr } from '@/shared/utils/toBytesStr'
import { toPercent } from '@/shared/utils/toPercent'

interface DiskUsageLegendProps {
    totalDiskUsage: number
    diskUsageData: { repoName: string; repoKey: string; diskUsage: number; color: string }[]
}

export const DiskUsageLegend: React.FC<DiskUsageLegendProps> = (props) => {
    const { totalDiskUsage, diskUsageData } = props

    const legendData: LegendData[] = diskUsageData.map(({ repoName, diskUsage, color }) => {
        return {
            label: `${repoName} (${toPercent(diskUsage, totalDiskUsage)}%, ${kbToStr(diskUsage, 2)})`,
            color: color,
        }
    })

    return <Legend legendData={legendData} />
}
