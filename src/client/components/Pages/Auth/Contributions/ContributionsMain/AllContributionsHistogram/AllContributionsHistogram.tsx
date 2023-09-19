import React, { useMemo } from 'react'

import Histogram from '@/client/components/Reuse/d3/Histogram'
import { getRandomScatterPointColor } from '@/client/utils/charts/chartColors'
import { dataToContributionsDateMapping } from '@/client/utils/charts/dataPointToTooltipLabel'
import { tickValueToDateLabel } from '@/client/utils/charts/tickValueToLabel'
import { SHARED_Model__CommitContributionsByRepo } from '@/shared/models/models/Contributions'

interface AllContributionsHistogramProps {
    contributionsByRepo: SHARED_Model__CommitContributionsByRepo[]
    width?: number
    height?: number
}

export const AllContributionsHistogram: React.FC<AllContributionsHistogramProps> = (props) => {
    const { contributionsByRepo, width = 790, height = 590 } = props

    const allContributionPoints: { x: number; y: number }[] = useMemo(() => {
        const aggregatedContributions = new Map<number, number>()
        contributionsByRepo.forEach((repoContributions) => {
            const {
                contributions: { nodes },
            } = repoContributions
            nodes.forEach(({ occurredAt, commitCount }) => {
                const contributionTs = new Date(occurredAt).getTime()
                const prevCommitCount = aggregatedContributions.get(contributionTs) || 0
                aggregatedContributions.set(contributionTs, prevCommitCount + commitCount)
            })
        })

        return Array.from(aggregatedContributions.entries()).map(([occurredAtTimestamp, commitCount]) => {
            return { x: occurredAtTimestamp, y: commitCount }
        })
    }, [contributionsByRepo])

    const histogramData: {
        points: { x: number; y: number }[]
        color?: string
        r?: number
    }[] = Array.of({
        points: allContributionPoints,
        color: getRandomScatterPointColor(),
        r: 3,
    })

    return useMemo(
        () => (
            <Histogram
                title="All (public) commit contributions"
                data={histogramData}
                width={width}
                height={height}
                yAxisProperties={{
                    label: 'Contributions',
                }}
                xAxisProperties={{
                    label: 'Date',
                    numTicks: 9,
                    tickLabelMapping: tickValueToDateLabel,
                }}
                dataTooltipMapping={dataToContributionsDateMapping}
            />
        ),
        [histogramData],
    )
}
