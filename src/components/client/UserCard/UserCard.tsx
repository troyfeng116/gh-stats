import React from 'react'

interface UserCardProps {
    accessToken: string
}

export const UserCard: React.FC<UserCardProps> = (props) => {
    const { accessToken } = props

    return <div>User card! {accessToken}</div>
}
