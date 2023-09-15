import React, { useMemo } from 'react'

import Histogram from '@/client/components/Reuse/d3/Histogram'
import { getRandomScatterPointColor } from '@/client/utils/charts/chartColors'
import { dataToContributionsDateMapping } from '@/client/utils/charts/dataPointToTooltipLabel'
import { tickValueToDateLabel } from '@/client/utils/charts/tickValueToLabel'
import { SHARED_Model__CommitContributionsByRepo } from '@/shared/models/models/Contributions'

interface RepoContributionsGraphProps {
    repoContributions: SHARED_Model__CommitContributionsByRepo
}

export const RepoContributionsGraph: React.FC<RepoContributionsGraphProps> = (props) => {
    const { repoContributions } = props

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
            <div>
                <Histogram
                    data={histogramData}
                    width={500}
                    height={360}
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
            </div>
        ),
        [repoContributions],
    )
}
