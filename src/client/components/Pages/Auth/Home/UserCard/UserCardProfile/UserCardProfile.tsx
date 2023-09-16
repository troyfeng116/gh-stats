import React from 'react'
import Image from 'next/image'

import { StdColors, StdLayout, StdMargin, StdTextSize } from '@/client/styles'
import { SHARED_Model__UserCard } from '@/shared/models/models/UserCard'
import { formatDate } from '@/shared/utils/dateUtils'

interface UserCardProfileProps {
    className?: string
    userCard: SHARED_Model__UserCard
}

export const UserCardProfile: React.FC<UserCardProfileProps> = (props) => {
    const { className, userCard } = props
    const { userId, name, email, followers, following, createdAt, avatarUrl } = userCard

    return (
        <div className={`${StdLayout.FlexCol} ${className || ''}`}>
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
        </div>
    )
}
