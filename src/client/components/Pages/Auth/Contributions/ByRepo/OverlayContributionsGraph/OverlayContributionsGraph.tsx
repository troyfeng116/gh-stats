import React, { useMemo } from 'react'

import Histogram from '@/client/components/Reuse/d3/Histogram'
import { dataToContributionsDateMapping } from '@/client/utils/dataToContributionsDateTooltip'
import { attachScatterPointColors } from '@/client/utils/scatterPointColors'
import { tickValueToDateLabel } from '@/client/utils/tickValueToDateLabel'
import { SHARED_Model__CommitContributionsByRepo } from '@/shared/models/models/Contributions'

interface OverlayContributionsGraphProps {
    contributionsByRepo: SHARED_Model__CommitContributionsByRepo[]
}

export const OverlayContributionsGraph: React.FC<OverlayContributionsGraphProps> = (props) => {
    const { contributionsByRepo } = props

    const histogramData: { points: { x: number; y: number }[] }[] = contributionsByRepo
        .map((repoContributions) => {
            return repoContributions.contributions.nodes
        })
        .map((nodes) => {
            const points = nodes.map(({ occurredAt, commitCount }) => {
                return { x: new Date(occurredAt).getTime(), y: commitCount }
            })
            return { points: points }
        })

    const histogramDataWithColors: { points: { x: number; y: number }[]; color?: string }[] =
        attachScatterPointColors(histogramData)

    return useMemo(
        () => (
            <div>
                <Histogram
                    data={histogramDataWithColors}
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
        [contributionsByRepo],
    )
}
