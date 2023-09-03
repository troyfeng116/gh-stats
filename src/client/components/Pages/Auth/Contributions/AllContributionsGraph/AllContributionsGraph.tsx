import React, { useMemo } from 'react'

import Histogram from '@/client/components/Reuse/d3/Histogram'
import { dataToContributionsDateMapping } from '@/client/utils/dataToContributionsDateTooltip'
import { tickValueToDateLabel } from '@/client/utils/tickValueToDateLabel'
import { SHARED_Model__CommitContributionsByRepo } from '@/shared/models/models/Contributions'

interface AllContributionsGraphProps {
    contributionsByRepo: SHARED_Model__CommitContributionsByRepo[]
}

export const AllContributionsGraph: React.FC<AllContributionsGraphProps> = (props) => {
    const { contributionsByRepo } = props

    const allContributionsData: { x: number; y: number }[] = useMemo(() => {
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

        return Array.from(aggregatedContributions.entries()).map(([occurredAt, commitCount]) => {
            return { x: occurredAt, y: commitCount }
        })
    }, [contributionsByRepo])

    return useMemo(
        () => (
            <div>
                <Histogram
                    data={allContributionsData}
                    width={500}
                    height={360}
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
            </div>
        ),
        [allContributionsData],
    )
}
