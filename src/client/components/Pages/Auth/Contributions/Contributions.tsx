'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'

import WeekContainer from './WeekContainer'

import { useAuth } from '@/client/components/Wrappers/AuthProvider'
import { contributionsAPI } from '@/client/lib/authAPI'
import { SHARED_Model__Contributions } from '@/shared/models/models/Contributions'

export const Contributions: React.FC = () => {
    const { accessToken } = useAuth()

    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [error, setError] = useState<string>()
    const [contributions, setContributions] = useState<SHARED_Model__Contributions>()

    useEffect(() => {
        const fetchContributions = async (accessToken: string) => {
            setError(undefined)
            const { success, error, contributions: updatedContributions } = await contributionsAPI(accessToken)
            setIsLoading(false)
            if (!success || updatedContributions === undefined) {
                setError(error)
            } else {
                setContributions(updatedContributions)
            }
        }

        if (accessToken !== undefined) {
            fetchContributions(accessToken)
        }
    }, [accessToken])

    if (accessToken === undefined) {
        return (
            <div>
                <Link href="/login">Please login</Link>
            </div>
        )
    }

    if (isLoading) {
        return <div>Loading</div>
    }

    if (error !== undefined || contributions === undefined) {
        return <div>{error}</div>
    }

    const { contributionCalendar, contributionYears, commitContributionsByRepository } = contributions
    const { totalContributions, weeks } = contributionCalendar

    return (
        <div>
            <h2>Last year of contributions</h2>
            <p>{contributionYears}</p>
            <div>
                <h3>Total contributions: {totalContributions}</h3>
                <WeekContainer weeks={weeks} />
            </div>
            <div>
                <h3>Contributions by repository:</h3>
                {commitContributionsByRepository.map((repoContributions, idx) => {
                    const { repository, contributions } = repoContributions
                    const {
                        name,
                        owner: { login },
                    } = repository
                    const { nodes } = contributions
                    return (
                        <div key={`repo-${idx}`}>
                            <p>
                                {login}/{name}
                            </p>
                            {nodes.map((node, idx) => {
                                const { occurredAt, commitCount } = node
                                return (
                                    <div key={`repo-contribution-node-${idx}`}>
                                        <div></div>
                                        <p>
                                            {commitCount} commits at {new Date(occurredAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                )
                            })}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
