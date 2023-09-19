import React, { useState } from 'react'

import OverlayContributionsGraph from './OverlayContributionsGraph'
import RepoContributionsGraph from './RepoContributionsGraph'

import { StdLayout, StdMargin, StdPadding, StdTextSize } from '@/client/styles'
import { SHARED_Model__CommitContributionsByRepo } from '@/shared/models/models/Contributions'
import { getRepoKey } from '@/shared/utils/getRepoKeyFromRepoContributions'

interface ByRepoProps {
    contributionsByRepo: SHARED_Model__CommitContributionsByRepo[]
}

export const ByRepo: React.FC<ByRepoProps> = (props) => {
    const { contributionsByRepo } = props

    const [shouldOverlay, setShouldOverlay] = useState<boolean>(true)
    const [selectedRepos, setSelectedRepos] = useState<Map<string, boolean>>(() => {
        const initialMap = new Map<string, boolean>()
        contributionsByRepo.forEach((repoContributions) => {
            initialMap.set(getRepoKey(repoContributions), true)
        })
        return initialMap
    })

    const handleOverlayToggled = () => {
        setShouldOverlay((prevShouldOverlay) => {
            return !prevShouldOverlay
        })
    }

    const handleRepoToggled = (repoKey: string) => {
        setSelectedRepos((prevSelectedRepos) => {
            const prevIsSelected = prevSelectedRepos.get(repoKey)
            const updatedIsSelected = prevIsSelected === undefined ? true : !prevIsSelected
            return new Map(prevSelectedRepos.set(repoKey, updatedIsSelected))
        })
    }

    const selectedRepoContributions: SHARED_Model__CommitContributionsByRepo[] = contributionsByRepo.filter(
        (repoContributions) => {
            return selectedRepos.get(getRepoKey(repoContributions)) === true
        },
    )

    let byRepoCharts: React.ReactElement | null = null
    if (shouldOverlay) {
        byRepoCharts = (
            <OverlayContributionsGraph contributionsByRepo={selectedRepoContributions} width={690} height={500} />
        )
    } else {
        byRepoCharts = (
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: 30,
                }}
            >
                {selectedRepoContributions.map((repoContributions, idx) => {
                    const repoKey = getRepoKey(repoContributions)
                    return (
                        <div
                            key={`repo-${idx}`}
                            className={`${StdPadding.All6} ${StdPadding.All12}`}
                            style={{ backgroundColor: 'rgb(39, 39, 39)', borderRadius: 12 }}
                        >
                            <RepoContributionsGraph
                                key={`repo-${repoKey}`}
                                repoKey={repoKey}
                                repoContributions={repoContributions}
                                width={500}
                                height={390}
                            />
                        </div>
                    )
                })}
            </div>
        )
    }

    return (
        <div className={`${StdLayout.FlexCol}`}>
            <h3 className={`${StdTextSize.Medium} ${StdMargin.B18}`}>
                Commit contributions breakdown by (public) repos
            </h3>
            <div>
                <input type="checkbox" checked={shouldOverlay} onChange={handleOverlayToggled} />
                Overlay
            </div>
            <div>
                <div>
                    {contributionsByRepo.map((repoContributions) => {
                        const {
                            contributions: { totalCount },
                        } = repoContributions
                        const repoKey = getRepoKey(repoContributions)
                        return (
                            <div key={`repo-select-${repoKey}`}>
                                <input
                                    type="checkbox"
                                    checked={selectedRepos.get(repoKey) === true}
                                    onChange={() => handleRepoToggled(repoKey)}
                                />
                                {repoKey} ({totalCount} commits)
                            </div>
                        )
                    })}
                </div>

                {selectedRepoContributions.length === 0 ? (
                    <p>Select a repo to view per-repo contribution charts</p>
                ) : (
                    byRepoCharts
                )}
            </div>
        </div>
    )
}
