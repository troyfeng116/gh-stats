'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'

import AllContributionsGraph from './AllContributionsGraph'
import ByRepo from './ByRepo'
import CalendarGrid from './CalendarGrid'
import DailyContributionInfo from './DailyContributionInfo'
import MonthlyContributionInfo from './MonthlyContributionInfo'

import { useAuth } from '@/client/components/Wrappers/AuthProvider'
import { contributionsAPI } from '@/client/lib/authAPI'
import { SHARED_Model__ContributionsClientInfo } from '@/shared/models/models/Contributions'

export const Contributions: React.FC = () => {
    const { accessToken } = useAuth()

    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [error, setError] = useState<string>()
    const [contributionsClientInfo, setContributionsClientInfo] = useState<SHARED_Model__ContributionsClientInfo>()

    useEffect(() => {
        const fetchContributions = async (accessToken: string) => {
            setError(undefined)
            const {
                success,
                error,
                contributionsClientInfo: updatedContributionsClientInfo,
            } = await contributionsAPI(accessToken, '2020-04-06T19:23:51Z', '2023-09-16T19:23:51Z')
            setIsLoading(false)
            if (!success || updatedContributionsClientInfo === undefined) {
                setError(error)
            } else {
                setContributionsClientInfo(updatedContributionsClientInfo)
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

    if (error !== undefined || contributionsClientInfo === undefined) {
        return <div>{error}</div>
    }

    const { contributions, dailyInfo, monthlyInfo, longestContributionStreak, longestContributionDrySpell } =
        contributionsClientInfo
    const { totalContributions, contributionCalendar, commitContributionsByRepository } = contributions
    const { weeks } = contributionCalendar

    return (
        <div>
            <h2>Last year of contributions</h2>
            <h3>Total contributions: {totalContributions}</h3>
            <p>Longest active streak: {longestContributionStreak} days</p>
            <p>Longest inactive streak: {longestContributionDrySpell} days</p>

            <div>
                <h3>Contributions calendar:</h3>
                <CalendarGrid weeks={weeks} />
            </div>
            <DailyContributionInfo dailyContributionInfo={dailyInfo} />
            <MonthlyContributionInfo monthlyContributionInfo={monthlyInfo} />

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
