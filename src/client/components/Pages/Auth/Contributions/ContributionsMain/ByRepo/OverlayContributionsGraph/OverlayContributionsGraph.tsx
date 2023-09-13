import React, { useMemo, useState } from 'react'

import Histogram from '@/client/components/Reuse/d3/Histogram'
import Legend from '@/client/components/Reuse/Legend'
import { dataToContributionsDateMapping } from '@/client/utils/dataToContributionsDateTooltip'
import { attachScatterPointColors } from '@/client/utils/scatterPointColors'
import { tickValueToDateLabel } from '@/client/utils/tickValueToDateLabel'
import { SHARED_Model__CommitContributionsByRepo } from '@/shared/models/models/Contributions'
import { getRepoKey } from '@/shared/utils/getRepoKeyFromRepoContributions'

interface OverlayContributionsGraphProps {
    contributionsByRepo: SHARED_Model__CommitContributionsByRepo[]
}

export const OverlayContributionsGraph: React.FC<OverlayContributionsGraphProps> = (props) => {
    const { contributionsByRepo } = props

    const [repoKeyToHighlight, setRepoKeyToHighlight] = useState<string>()

    const histogramData: { points: { x: number; y: number }[]; repoKey: string }[] = contributionsByRepo
        .map((repoContributions) => {
            return { nodes: repoContributions.contributions.nodes, repoKey: getRepoKey(repoContributions) }
        })
        .map(({ nodes, repoKey }) => {
            const points = nodes.map(({ occurredAt, commitCount }) => {
                return { x: new Date(occurredAt).getTime(), y: commitCount }
            })
            return { points: points, repoKey: repoKey }
        })

    const histogramDataWithColors: { points: { x: number; y: number }[]; color: string; repoKey: string }[] =
        attachScatterPointColors(histogramData)

    const histogramDataWithHighlighted: {
        points: {
            x: number
            y: number
        }[]
        color: string
        r: number
        lineStrokeWidth: number
    }[] = histogramDataWithColors
        .map((data) => {
            const { repoKey } = data
            if (repoKey == repoKeyToHighlight) {
                return { ...data, r: 3.9, lineStrokeWidth: 3 }
            }
            return { ...data, r: 2.9, lineStrokeWidth: 1.5 }
        })
        .sort(
            ({ repoKey: repoKey1 }, { repoKey: repoKey2 }) =>
                (repoKey1 === repoKeyToHighlight ? 1 : 0) - (repoKey2 === repoKeyToHighlight ? 1 : 0),
        )

    const legendData: {
        label: string
        color: string
        onMouseEnter: React.MouseEventHandler<Element>
        onMouseLeave: React.MouseEventHandler<Element>
    }[] = histogramDataWithColors.map(({ color, repoKey }) => {
        return {
            label: repoKey,
            color: color,
            onMouseEnter: () => setRepoKeyToHighlight(repoKey),
            onMouseLeave: () => setRepoKeyToHighlight(undefined),
        }
    })

    return useMemo(
        () => (
            <div style={{ display: 'flex' }}>
                <Histogram
                    data={histogramDataWithHighlighted}
                    width={690}
                    height={420}
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

                <Legend legendData={legendData} />
            </div>
        ),
        [contributionsByRepo, repoKeyToHighlight],
    )
}
