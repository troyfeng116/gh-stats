import React, { useState } from 'react'

import RepoContributionsGraph from './RepoContributionsGraph'

import { SHARED_Model__CommitContributionsByRepo } from '@/shared/models/models/Contributions'

interface ByRepoProps {
    contributionsByRepo: SHARED_Model__CommitContributionsByRepo[]
}

const getRepoKey = (repoContributions: SHARED_Model__CommitContributionsByRepo): string => {
    const {
        repository: {
            name,
            owner: { login },
        },
    } = repoContributions
    return `${login}/${name}`
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
            console.log(`handling toggled ${repoKey}: setting to ${updatedIsSelected}`)
            return new Map(prevSelectedRepos.set(repoKey, updatedIsSelected))
        })
    }

    const selectedRepoContributions: SHARED_Model__CommitContributionsByRepo[] = contributionsByRepo.filter(
        (repoContributions) => {
            return selectedRepos.get(getRepoKey(repoContributions)) === true
        },
    )

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
                        selectedRepoContributions.map((repoContributions, idx) => {
                            const repoKey = getRepoKey(repoContributions)
                            return (
                                <div key={`repo-${idx}`}>
                                    <p>{repoKey}</p>
                                    <RepoContributionsGraph
                                        key={`repo-${repoKey}`}
                                        repoContributions={repoContributions}
                                    />
                                </div>
                            )
                        })
                    )}
                </div>
            </div>
        </div>
    )
}
