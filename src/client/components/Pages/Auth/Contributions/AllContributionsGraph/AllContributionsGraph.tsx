import React, { useMemo } from 'react'

import Histogram from '@/client/components/Reuse/d3/Histogram'
import { SHARED_Model__CommitContributionsByRepo } from '@/shared/models/models/Contributions'

interface AllContributionsGraphProps {
    contributionsByRepo: SHARED_Model__CommitContributionsByRepo[]
}

export const AllContributionsGraph: React.FC<AllContributionsGraphProps> = (props) => {
    const { contributionsByRepo } = props

    const allContributionsData: { x: number; y: number }[] = useMemo(() => {
        return contributionsByRepo
            .map((repoContributions) => {
                const {
                    contributions: { nodes },
                } = repoContributions
                return nodes.map(({ occurredAt, commitCount }) => {
                    return { x: new Date(occurredAt).getTime(), y: commitCount }
                })
            })
            .reduce((prevData, currentDataSoFar) => {
                currentDataSoFar.push(...prevData)
                return currentDataSoFar
            }, [])
    }, [contributionsByRepo])

    return (
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
                    tickLabelMapping: (tickValue) => {
                        return new Date(tickValue).toLocaleDateString(undefined, {
                            year: '2-digit',
                            month: 'numeric',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: false,
                        })
                    },
                }}
            />
        </div>
    )
}
