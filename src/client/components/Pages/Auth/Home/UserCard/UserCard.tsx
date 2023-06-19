import React from 'react'

import { SHARED_Model__UserCard } from '@/shared/models/models/UserCard'

interface UserCardProps {
    userCard: SHARED_Model__UserCard
}

export const UserCard: React.FC<UserCardProps> = (props) => {
    const { userCard } = props
    const { userId, name, email, followers, following, createdAt, totalRepos, totalPRs } = userCard

    return (
        <div>
            <h2>{userId}</h2>
            {name && <p>{name}</p>}
            {email && <p>{email}</p>}
            {createdAt !== undefined && <p>Account created: {new Date(Date.parse(createdAt)).toLocaleString()}</p>}
            <p>Total repos: {totalRepos}</p>
            <p>Total PRs merged: {totalPRs}</p>
            <p>
                {followers} followers, {following} following
            </p>
        </div>
    )
}
