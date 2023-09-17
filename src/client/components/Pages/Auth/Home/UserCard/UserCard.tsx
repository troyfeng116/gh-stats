import React from 'react'

import { UserCardStats } from './UserCardStats/UserCardStats'
import UserCardProfile from './UserCardProfile'

import Card from '@/client/components/Reuse/Card'
import HrDivider from '@/client/components/Reuse/HrDivider'
import { StdLayout, StdMargin, StdPadding } from '@/client/styles'
import { SHARED_Model__UserCardClientInfo } from '@/shared/models/models/UserCard'

interface UserCardProps {
    userCardClientInfo: SHARED_Model__UserCardClientInfo
}

export const UserCard: React.FC<UserCardProps> = (props) => {
    const { userCardClientInfo } = props
    const { userCard, contributionsAggregate } = userCardClientInfo
    const { totalPublicRepos, totalMergedPRs } = userCard

    return (
        <Card className={`${StdLayout.FlexCol} ${StdPadding.All24}`}>
            <UserCardProfile userCard={userCard} className={`${StdMargin.B12}`} />
            <HrDivider />
            <UserCardStats
                contributionsAggregate={contributionsAggregate}
                totalMergedPRs={totalMergedPRs}
                totalPublicRepos={totalPublicRepos}
            />
        </Card>
    )
}
