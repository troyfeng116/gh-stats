import React, { useMemo, useState } from 'react'

import Histogram from '@/client/components/Reuse/d3/Histogram'
import Legend from '@/client/components/Reuse/Legend'
import { attachScatterPointColors } from '@/client/utils/charts/chartColors'
import { dataToContributionsDateMapping } from '@/client/utils/charts/dataPointToTooltipLabel'
import { tickValueToDateLabel } from '@/client/utils/charts/tickValueToLabel'
import { SHARED_Model__CommitContributionsByRepo } from '@/shared/models/models/Contributions'
import { getRepoKey } from '@/shared/utils/getRepoKeyFromRepoContributions'

interface OverlayContributionsGraphProps {
    contributionsByRepo: SHARED_Model__CommitContributionsByRepo[]
    width?: number
    height?: number
}

export const OverlayContributionsGraph: React.FC<OverlayContributionsGraphProps> = (props) => {
    const { contributionsByRepo, width = 690, height = 500 } = props

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
        opacity: number
        lineStrokeWidth: number
    }[] = histogramDataWithColors
        .map((data) => {
            const { repoKey } = data
            if (repoKey == repoKeyToHighlight) {
                return { ...data, r: 3.3, opacity: 1, lineStrokeWidth: 3 }
            }
            return { ...data, r: 2.8, opacity: repoKeyToHighlight !== undefined ? 0.5 : 1, lineStrokeWidth: 1.5 }
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
                    title="(public) Commit contributions by repo: overlay"
                    data={histogramDataWithHighlighted}
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

                <Legend legendData={legendData} />
            </div>
        ),
        [histogramDataWithHighlighted, legendData],
    )
}
