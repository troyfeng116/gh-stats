import React from 'react'

import Card from '@/client/components/Reuse/Card'
import { SHARED_Model__UserCardClientInfo } from '@/shared/models/models/UserCard'

interface UserCardProps {
    userCardClientInfo: SHARED_Model__UserCardClientInfo
}

export const UserCard: React.FC<UserCardProps> = (props) => {
    const { userCardClientInfo } = props
    const { userCard, contributionsAggregate } = userCardClientInfo
    const { userId, name, email, followers, following, createdAt, totalRepos, totalPRs } = userCard
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
        <Card>
            <h2>{userId}</h2>
            {name && <p>{name}</p>}
            {email && <p>{email}</p>}
            {createdAt !== undefined && <p>Account created: {new Date(Date.parse(createdAt)).toLocaleString()}</p>}
            <p>Total repos: {totalRepos}</p>
            <p>Total PRs merged: {totalPRs}</p>
            <p>
                {followers} followers, {following} following
            </p>

            <h3>Lifetime contributions</h3>
            <p>{totalCommitContributions} commits</p>
            <p>{totalIssueContributions} issues</p>
            <p>{totalPullRequestContributions} pull requests</p>
            <p>{totalPullRequestReviewContributions} pull requests reviewed</p>
            <p>{totalRepositoriesWithContributedCommits} repositories contributed to</p>
            <p>{totalRepositoryContributions} repositories created</p>
            <p>{restrictedContributionsCount} restricted contributions</p>
            <p>{totalContributions} total contributions</p>
        </Card>
    )
}
