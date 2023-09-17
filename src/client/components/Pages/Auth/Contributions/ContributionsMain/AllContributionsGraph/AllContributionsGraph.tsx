import React, { useMemo } from 'react'

import Histogram from '@/client/components/Reuse/d3/Histogram'
import { getRandomScatterPointColor } from '@/client/utils/charts/chartColors'
import { dataToContributionsDateMapping } from '@/client/utils/charts/dataPointToTooltipLabel'
import { tickValueToDateLabel } from '@/client/utils/charts/tickValueToLabel'
import { SHARED_Model__CommitContributionsByRepo } from '@/shared/models/models/Contributions'

interface AllContributionsGraphProps {
    contributionsByRepo: SHARED_Model__CommitContributionsByRepo[]
}

export const AllContributionsGraph: React.FC<AllContributionsGraphProps> = (props) => {
    const { contributionsByRepo } = props

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
                data={histogramData}
                width={900}
                height={600}
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
        [allContributionPoints],
    )
}
