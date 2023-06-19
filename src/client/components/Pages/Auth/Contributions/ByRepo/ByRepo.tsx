import React from 'react'

import Repo from './Repo'

import { SHARED_Model__CommitContributionsByRepo } from '@/shared/models/models/Contributions'

interface ByRepoProps {
    contributionsByRepo: SHARED_Model__CommitContributionsByRepo[]
}

export const ByRepo: React.FC<ByRepoProps> = (props) => {
    const { contributionsByRepo } = props

    return (
        <div>
            {contributionsByRepo.map((repoContributions, idx) => {
                return <Repo key={`repo-${idx}`} repoContributions={repoContributions} />
            })}
        </div>
    )
}
