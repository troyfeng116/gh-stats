import React from 'react'

import UserCardDivider from './UserCardDivider'
import UserCardRow from './UserCardRow'

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
            <UserCardDivider />
            <UserCardRow value={totalCommitContributions} label="commits" />
            <UserCardRow value={totalContributions} label="total contributions" />
            <UserCardRow value={restrictedContributionsCount} label="private contributions" />
            <UserCardDivider />
            <UserCardRow value={totalPullRequestContributions} label="PRs created" />
            <UserCardRow value={totalMergedPRs} label="PRs merged" />
            <UserCardRow value={totalPullRequestReviewContributions} label="PRs reviewed" />
            <UserCardRow value={totalIssueContributions} label="issues raised" />
            <UserCardDivider />
            <UserCardRow value={totalPublicRepos} label="public repos" />
            <UserCardRow value={totalRepositoryContributions} label="repos created" />
            <UserCardRow value={totalRepositoriesWithContributedCommits} label="repos contributed to" />
        </div>
    )
}
