import React, { useEffect, useState } from 'react'

import { getUserCardAPI } from '@/client/lib/authAPI'
import { SHARED_UserCardData } from '@/models/shared'

interface UserCardProps {
    accessToken: string
}

export const UserCard: React.FC<UserCardProps> = (props) => {
    const { accessToken } = props
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [error, setError] = useState<string>()
    const [userCard, setUserCard] = useState<SHARED_UserCardData>({})

    useEffect(() => {
        const fetchUserCard = async (accessToken: string) => {
            setError(undefined)
            const { success, error, userCard: getUserCardAPIRes } = await getUserCardAPI(accessToken)
            setIsLoading(false)
            if (!success || getUserCardAPIRes === undefined) {
                setError(error)
            } else {
                setUserCard(getUserCardAPIRes)
            }
        }

        fetchUserCard(accessToken)
    }, [accessToken])

    if (isLoading) {
        return <div>user card loading...</div>
    }

    if (error !== undefined) {
        return <div>{error}</div>
    }

    const { userId, name, email, followers, following, createdAt, publicRepos, privateRepos, totalRepos } = userCard
    return (
        <div>
            <h2>{userId}</h2>
            {name && <p>{name}</p>}
            {email && <p>{email}</p>}
            {createdAt !== undefined && <p>Account created: {new Date(Date.parse(createdAt)).toLocaleString()}</p>}
            <p>
                Total repos: {totalRepos} ({publicRepos} public, {privateRepos} private)
            </p>
            <p>
                {followers} followers, {following} following
            </p>
        </div>
    )
}
