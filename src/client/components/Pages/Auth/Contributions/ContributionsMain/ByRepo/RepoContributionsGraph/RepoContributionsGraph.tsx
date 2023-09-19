import React, { useMemo } from 'react'

import Histogram from '@/client/components/Reuse/d3/Histogram'
import { getRandomScatterPointColor } from '@/client/utils/charts/chartColors'
import { dataToContributionsDateMapping } from '@/client/utils/charts/dataPointToTooltipLabel'
import { tickValueToDateLabel } from '@/client/utils/charts/tickValueToLabel'
import { SHARED_Model__CommitContributionsByRepo } from '@/shared/models/models/Contributions'

interface RepoContributionsGraphProps {
    repoKey: string
    repoContributions: SHARED_Model__CommitContributionsByRepo
    width?: number
    height?: number
}

export const RepoContributionsGraph: React.FC<RepoContributionsGraphProps> = (props) => {
    const { repoKey, repoContributions, width = 500, height = 390 } = props

    const { contributions } = repoContributions
    const { nodes } = contributions

    const points = nodes.map(({ occurredAt, commitCount }) => {
        return { x: new Date(occurredAt).getTime(), y: commitCount }
    })

    const histogramData: { points: { x: number; y: number }[]; color: string; r: number }[] = Array.of({
        points: points,
        color: getRandomScatterPointColor(),
        r: 3.9,
    })

    return useMemo(
        () => (
            <Histogram
                title={repoKey}
                data={histogramData}
                width={width}
                height={height}
                yAxisProperties={{
                    label: 'Contributions',
                }}
                xAxisProperties={{
                    label: 'Date',
                    tickMarkOverride: points.length <= 2 ? points.map(({ x }) => x) : undefined,
                    tickLabelMapping: tickValueToDateLabel,
                }}
                dataTooltipMapping={dataToContributionsDateMapping}
            />
        ),
        [repoContributions],
    )
}
