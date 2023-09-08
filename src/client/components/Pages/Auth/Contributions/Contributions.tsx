'use client'

import React, { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'

import AllContributionsGraph from './AllContributionsGraph'
import ByRepo from './ByRepo'
import CalendarGrid from './CalendarGrid'
import DailyContributionInfo from './DailyContributionInfo'
import MonthlyContributionInfo from './MonthlyContributionInfo'

import Button from '@/client/components/Reuse/Button'
import { useAuth } from '@/client/components/Wrappers/AuthProvider'
import { contributionsAPI } from '@/client/lib/authAPI'
import { validateRangeQueryDates } from '@/client/utils/validateRangeQueryDates'
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
    const [prevQueriedDateRange, setPrevQueriedDateRange] = useState<{ from?: string; to?: string }>({
        from: undefined,
        to: undefined,
    })
    const [queryDateRangeError, setQueryDateRangeError] = useState<string>()

    const fetchContributions = useCallback(async (accessToken: string, from?: string, to?: string) => {
        // TODO: reducer
        setQueryDateRangeError(undefined)
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
            // setContributionsClientInfo(undefined)
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
            const { from: prevFrom, to: prevTo } = prevQueriedDateRange
            if (curFrom === prevFrom && curTo === prevTo) {
                setQueryDateRangeError('Please specify a new date range to query!')
                return
            }

            const dateRangeValidationError = validateRangeQueryDates(curFrom, curTo)
            if (dateRangeValidationError !== null) {
                setQueryDateRangeError(dateRangeValidationError)
                return
            }

            setPrevQueriedDateRange({ from: curFrom, to: curTo })
            // TODO: client-side validate dates
            fetchContributions(accessToken, curFrom, curTo)
        }
    }, [accessToken, triggerFetch, queryDateRange, prevQueriedDateRange])

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

    const {
        contributions,
        calendarGrid,
        dailyInfo,
        monthlyInfo,
        longestContributionStreak,
        longestContributionDrySpell,
    } = contributionsClientInfo
    const { totalContributions, commitContributionsByRepository, startedAt, endedAt } = contributions

    const { from, to } = queryDateRange

    const handleFromOnChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        setQueryDateRange((prevRange) => {
            return { ...prevRange, from: e.target.value }
        })
    }

    const handleToOnChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        setQueryDateRange((prevRange) => {
            return { ...prevRange, to: e.target.value }
        })
    }

    const handleOnFocus: React.FocusEventHandler<HTMLInputElement> = () => {
        setQueryDateRangeError(undefined)
    }

    const handleOnClick: React.MouseEventHandler<HTMLButtonElement> = () => {
        if (!isLoading) {
            setTriggerFetch(true)
        }
    }

    const isButtonDisabled =
        isLoading ||
        queryDateRangeError !== undefined ||
        (prevQueriedDateRange.from === queryDateRange.from && prevQueriedDateRange.to === queryDateRange.to)

    return (
        <div>
            <div>
                <label htmlFor="from" />
                <input type="date" id="from" value={from} onChange={handleFromOnChange} onFocus={handleOnFocus} />

                <label htmlFor="to" />
                <input type="date" id="to" value={to} onChange={handleToOnChange} onFocus={handleOnFocus} />

                <Button onClick={handleOnClick} disabled={isButtonDisabled}>
                    Query
                </Button>

                {queryDateRangeError !== undefined && <p>{queryDateRangeError}</p>}
            </div>
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
