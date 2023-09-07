import React, { useState } from 'react'

import OverlayContributionsGraph from './OverlayContributionsGraph'
import RepoContributionsGraph from './RepoContributionsGraph'

import { getRepoKey } from '@/client/utils/getRepoKeyFromRepoContributions'
import { SHARED_Model__CommitContributionsByRepo } from '@/shared/models/models/Contributions'

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
        byRepoCharts = <OverlayContributionsGraph contributionsByRepo={selectedRepoContributions} />
    } else {
        byRepoCharts = (
            <>
                {selectedRepoContributions.map((repoContributions, idx) => {
                    const repoKey = getRepoKey(repoContributions)
                    return (
                        <div key={`repo-${idx}`}>
                            <p>{repoKey}</p>
                            <RepoContributionsGraph key={`repo-${repoKey}`} repoContributions={repoContributions} />
                        </div>
                    )
                })}
            </>
        )
    }

    return (
        <div>
            <div>
                <input type="checkbox" checked={shouldOverlay} onChange={handleOverlayToggled} />
                Overlay
            </div>
            <div>
                <div>
                    {contributionsByRepo.map((repoContributions) => {
                        const repoKey = getRepoKey(repoContributions)
                        return (
                            <div key={`repo-select-${repoKey}`}>
                                <input
                                    type="checkbox"
                                    checked={selectedRepos.get(repoKey) === true}
                                    onChange={() => handleRepoToggled(repoKey)}
                                />
                                {repoKey}
                            </div>
                        )
                    })}
                </div>

                <div>
                    {selectedRepoContributions.length === 0 ? (
                        <p>Select a repo to view per-repo contribution charts</p>
                    ) : (
                        byRepoCharts
                    )}
                </div>
            </div>
        </div>
    )
}
