'use client'

import React, { useCallback, useEffect, useState } from 'react'

import AllContributionsGraph from './AllContributionsGraph'
import ByRepo from './ByRepo'
import CalendarGrid from './CalendarGrid'
import DailyContributionInfo from './DailyContributionInfo'
import MonthlyContributionInfo from './MonthlyContributionInfo'

import DateRangeInput from '@/client/components/Reuse/DateRangeInput'
import { useAuth } from '@/client/components/Wrappers/AuthProvider'
import { contributionsAPI } from '@/client/lib/authAPI'
import { SHARED_Model__ContributionsClientInfo } from '@/shared/models/models/Contributions'
import { formatDateUTC__MDYYYY } from '@/shared/utils/dateUtils'

export const Contributions: React.FC = () => {
    const { accessToken } = useAuth()

    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [error, setError] = useState<string>()
    const [contributionsClientInfo, setContributionsClientInfo] = useState<SHARED_Model__ContributionsClientInfo>()

    const [triggerFetch, setTriggerFetch] = useState<boolean>(false)
    const [queryDateRange, setQueryDateRange] = useState<{ from?: string; to?: string }>({
        from: undefined,
        to: undefined,
    })

    const fetchContributions = useCallback(async (accessToken: string, from?: string, to?: string) => {
        // TODO: reducer
        setError(undefined)
        setTriggerFetch(false)

        setIsLoading(true)
        const {
            success,
            error,
            contributionsClientInfo: updatedContributionsClientInfo,
        } = await contributionsAPI(accessToken, from, to)
        setIsLoading(false)

        if (!success || updatedContributionsClientInfo === undefined) {
            setError(error)
        } else {
            setContributionsClientInfo(updatedContributionsClientInfo)
        }
    }, [])

    // initial fetch: one year lookback with undefined from/to range
    useEffect(() => {
        if (accessToken !== undefined) {
            fetchContributions(accessToken, undefined, undefined)
        }
    }, [accessToken])

    // custom lookback
    useEffect(() => {
        setTriggerFetch(false)

        if (triggerFetch && accessToken !== undefined) {
            const { from: curFrom, to: curTo } = queryDateRange
            // TODO: client-side validate dates
            fetchContributions(accessToken, curFrom, curTo)
        }
    }, [accessToken, triggerFetch, queryDateRange])

    if (isLoading) {
        return <div>Loading</div>
    }

    if (error !== undefined || contributionsClientInfo === undefined) {
        return <div>{error}</div>
    }

    const {
        contributions,
        calendarGrid,
        dailyInfo,
        monthlyInfo,
        longestContributionStreak,
        longestContributionDrySpell,
    } = contributionsClientInfo
    const { totalContributions, commitContributionsByRepository, startedAt, endedAt } = contributions

    const handleRangeSelected = (fromDate: string | undefined, toDate: string | undefined) => {
        setQueryDateRange({ from: fromDate, to: toDate })
        setTriggerFetch(true)
    }

    return (
        <div>
            <DateRangeInput initialFrom={undefined} initialTo={undefined} handleRangeSelected={handleRangeSelected} />
            <h2>
                Contributions from {formatDateUTC__MDYYYY(startedAt)}
                &nbsp;to {formatDateUTC__MDYYYY(endedAt)}
            </h2>
            <h3>Total contributions: {totalContributions}</h3>
            <p>Longest active streak: {longestContributionStreak} days</p>
            <p>Longest inactive streak: {longestContributionDrySpell} days</p>

            <div>
                <h3>Contributions calendar</h3>
                <CalendarGrid calendarGrid={calendarGrid} />
            </div>
            <DailyContributionInfo dailyContributionInfo={dailyInfo} />
            <MonthlyContributionInfo monthlyContributionInfo={monthlyInfo} />

            <div>
                <h3>Commit contributions graph</h3>
                <AllContributionsGraph contributionsByRepo={commitContributionsByRepository} />
            </div>
            <div>
                <h3>Commit contributions by repository</h3>
                <ByRepo contributionsByRepo={commitContributionsByRepository} />
            </div>
        </div>
    )
}
