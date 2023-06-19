import React from 'react'

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

    return (
        <div>
            <p>
                {login}/{name}
            </p>
            {nodes.map((node, idx) => {
                const { occurredAt, commitCount } = node
                return (
                    <div key={`repo-contribution-node-${idx}`}>
                        <div>{occurredAt}</div>
                        <p>
                            {commitCount} commits at {new Date(occurredAt).toLocaleDateString()}
                        </p>
                    </div>
                )
            })}
        </div>
    )
}
