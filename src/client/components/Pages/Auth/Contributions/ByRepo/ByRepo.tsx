import React from 'react'

import RepoContributionsGraph from './RepoContributionsGraph'

import { SHARED_Model__CommitContributionsByRepo } from '@/shared/models/models/Contributions'

interface ByRepoProps {
    contributionsByRepo: SHARED_Model__CommitContributionsByRepo[]
}

export const ByRepo: React.FC<ByRepoProps> = (props) => {
    const { contributionsByRepo } = props

    return (
        <div>
            {contributionsByRepo.map((repoContributions, idx) => {
                const { repository } = repoContributions
                const {
                    name,
                    owner: { login },
                } = repository

                return (
                    <div key={`repo-${idx}`}>
                        <p>
                            {login}/{name}
                        </p>
                        <RepoContributionsGraph key={`repo-${idx}`} repoContributions={repoContributions} />{' '}
                    </div>
                )
            })}
        </div>
    )
}
