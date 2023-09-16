import React from 'react'
import Image from 'next/image'

import UserCardRow from './UserCardRow'

import Card from '@/client/components/Reuse/Card'
import { StdColors, StdLayout, StdMargin, StdPadding, StdTextSize } from '@/client/styles'
import { SHARED_Model__UserCardClientInfo } from '@/shared/models/models/UserCard'
import { formatDate } from '@/shared/utils/dateUtils'

interface UserCardProps {
    userCardClientInfo: SHARED_Model__UserCardClientInfo
}

export const UserCard: React.FC<UserCardProps> = (props) => {
    const { userCardClientInfo } = props
    const { userCard, contributionsAggregate } = userCardClientInfo
    const { userId, name, email, followers, following, createdAt, avatarUrl, totalRepos, totalPRs } = userCard
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
        <Card className={`${StdLayout.FlexCol} ${StdPadding.All24}`}>
            <Image src={avatarUrl} width={89} height={89} alt="Github avatar" style={{ borderRadius: '50%' }} />
            <h2 className={`${StdTextSize.H2} ${StdMargin.T12} ${StdMargin.B6}`}>{userId}</h2>
            <div className={`${StdLayout.FlexCol} ${StdColors.LightGray}`}>
                {name && <p>{name}</p>}
                {email && <p>{email}</p>}
                {createdAt !== undefined && (
                    <p>
                        joined&nbsp;
                        {formatDate(createdAt, {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                        })}
                    </p>
                )}
                <p>
                    {followers} followers, {following} following
                </p>
            </div>

            <div className={StdMargin.T18}>
                <UserCardRow value={totalCommitContributions} label="commits" />
                <UserCardRow value={totalContributions} label="total contributions" />
                <UserCardRow value={restrictedContributionsCount} label="private contributions" />
                <hr color="rgb(199, 199, 199)" className={`${StdMargin.T6} ${StdMargin.B6}`} />
                <UserCardRow value={totalPullRequestContributions} label="PRs created" />
                <UserCardRow value={totalPRs} label="PRs merged" />
                <UserCardRow value={totalPullRequestReviewContributions} label="PRs reviewed" />
                <UserCardRow value={totalIssueContributions} label="issues raised" />
                <hr color="rgb(199, 199, 199)" className={`${StdMargin.T6} ${StdMargin.B6}`} />
                <UserCardRow value={totalRepos} label="public repos" />
                <UserCardRow value={totalRepositoryContributions} label="repos created" />
                <UserCardRow value={totalRepositoriesWithContributedCommits} label="repos contributed to" />
            </div>
        </Card>
    )
}
