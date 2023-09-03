import React from 'react'

import Histogram from '@/client/components/Reuse/d3/Histogram'
import { dataToContributionsDateMapping } from '@/client/utils/dataToContributionsDateTooltip'
import { tickValueToDateLabel } from '@/client/utils/tickValueToDateLabel'
import { SHARED_Model__CommitContributionsByRepo } from '@/shared/models/models/Contributions'

interface RepoContributionsGraph {
    repoContributions: SHARED_Model__CommitContributionsByRepo
}

export const RepoContributionsGraph: React.FC<RepoContributionsGraph> = (props) => {
    const { repoContributions } = props

    const { contributions } = repoContributions
    const { nodes } = contributions

    const histogramData: { x: number; y: number }[] = nodes.map(({ occurredAt, commitCount }) => {
        return { x: new Date(occurredAt).getTime(), y: commitCount }
    })

    return (
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
                    numTicks: 9,
                    tickLabelMapping: tickValueToDateLabel,
                }}
                dataTooltipMapping={dataToContributionsDateMapping}
            />
        </div>
    )
}
