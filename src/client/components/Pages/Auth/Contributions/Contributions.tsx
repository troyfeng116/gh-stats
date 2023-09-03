'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'

import AllContributionsGraph from './AllContributionsGraph'
import ByRepo from './ByRepo'
import CalendarGrid from './CalendarGrid'

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
            <h3>Total contributions: {totalContributions}</h3>
            <p>Previously contributed in {contributionYears.join(', ')}</p>
            <div>
                <h3>Contributions calendar:</h3>
                <CalendarGrid weeks={weeks} />
            </div>
            <div>
                <h3>Last year of contributions:</h3>
                <AllContributionsGraph contributionsByRepo={commitContributionsByRepository} />
            </div>
            <div>
                <h3>Contributions by repository:</h3>
                <ByRepo contributionsByRepo={commitContributionsByRepository} />
            </div>
        </div>
    )
}
