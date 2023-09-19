import React, { useState } from 'react'

import OverlayContributionsGraph from './OverlayContributionsGraph'
import RepoContributionsGraph from './RepoContributionsGraph'

import Card, { CardType } from '@/client/components/Reuse/Card'
import Toggle from '@/client/components/Reuse/Toggle'
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
            <Card className={`${StdPadding.All12}`} type={CardType.Tertiary}>
                <OverlayContributionsGraph contributionsByRepo={selectedRepoContributions} width={690} height={500} />
            </Card>
        )
    } else {
        byRepoCharts = (
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: 18,
                }}
            >
                {selectedRepoContributions.map((repoContributions, idx) => {
                    const repoKey = getRepoKey(repoContributions)
                    return (
                        <Card key={`repo-${idx}`} className={`${StdPadding.All12}`} type={CardType.Tertiary}>
                            <RepoContributionsGraph
                                key={`repo-${repoKey}`}
                                repoKey={repoKey}
                                repoContributions={repoContributions}
                                width={500}
                                height={390}
                            />
                        </Card>
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
            <Toggle label="Overlay charts" isToggleOn={shouldOverlay} handleToggle={handleOverlayToggled} />

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
