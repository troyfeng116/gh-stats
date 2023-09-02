import React from 'react'

import Histogram from '../Histogram'

import { SHARED_Model__CommitContributionsByRepo } from '@/shared/models/models/Contributions'

interface RepoProps {
    repoContributions: SHARED_Model__CommitContributionsByRepo
}

export const Repo: React.FC<RepoProps> = (props) => {
    const { repoContributions } = props

    const { repository, contributions } = repoContributions
    const {
        name,
        owner: { login },
    } = repository
    const { nodes } = contributions

    const histogramData: { x: number; y: number }[] = nodes.map(({ occurredAt, commitCount }) => {
        return { x: new Date(occurredAt).getTime(), y: commitCount }
    })

    return (
        <div>
            <p>
                {login}/{name}
            </p>
            <Histogram
                data={histogramData}
                yAxisProperties={{
                    label: 'Contributions',
                }}
                xAxisProperties={{
                    label: 'Date',
                    numTicks: Math.min(histogramData.length, 9),
                    tickLabelMapping: (tickValue) => {
                        return new Date(tickValue).toLocaleDateString(undefined, {
                            year: '2-digit',
                            month: 'numeric',
                            day: 'numeric',
                            hour: 'numeric',
                            minute: '2-digit',
                        })
                    },
                }}
            />
        </div>
    )
}
