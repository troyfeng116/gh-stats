import React from 'react'

import HrDivider from '@/client/components/Reuse/HrDivider'
import StatRow from '@/client/components/Reuse/StatRow'
import { SHARED_Model__ContributionsAggregate } from '@/shared/models/models/Contributions'

interface UserCardStatsProps {
    contributionsAggregate: SHARED_Model__ContributionsAggregate
    totalPublicRepos: number
    totalMergedPRs: number
}

export const UserCardStats: React.FC<UserCardStatsProps> = (props) => {
    const { contributionsAggregate, totalPublicRepos, totalMergedPRs } = props
    const {
        restrictedContributionsCount,
        totalCommitContributions,
        totalIssueContributions,
        totalPullRequestContributions,
        totalPullRequestReviewContributions,
        totalRepositoriesWithContributedCommits,
        totalRepositoryContributions,
        totalContributions,
    } = contributionsAggregate

    return (
        <div>
            <StatRow value={totalCommitContributions} label="commits" />
            <StatRow value={totalContributions} label="total contributions" />
            <StatRow value={restrictedContributionsCount} label="private contributions" />
            <HrDivider />
            <StatRow value={totalPullRequestContributions} label="PRs created" />
            <StatRow value={totalMergedPRs} label="PRs merged" />
            <StatRow value={totalPullRequestReviewContributions} label="PRs reviewed" />
            <StatRow value={totalIssueContributions} label="issues raised" />
            <HrDivider />
            <StatRow value={totalPublicRepos} label="public repos" />
            <StatRow value={totalRepositoryContributions} label="repos created" />
            <StatRow value={totalRepositoriesWithContributedCommits} label="repos contributed to" />
        </div>
    )
}
