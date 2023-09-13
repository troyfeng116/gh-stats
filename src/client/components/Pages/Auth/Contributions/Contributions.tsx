'use client'

import React, { useCallback, useEffect, useState } from 'react'

import ContributionsMain from './ContributionsMain'

import DateRangeInput from '@/client/components/Reuse/DateRangeInput'
import { useAuth } from '@/client/components/Wrappers/AuthProvider'
import { contributionsAPI } from '@/client/lib/authAPI'
import { SHARED_Model__ContributionsClientInfo } from '@/shared/models/models/Contributions'

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

    const handleRangeSelected = (fromDate: string | undefined, toDate: string | undefined) => {
        setQueryDateRange({ from: fromDate, to: toDate })
        setTriggerFetch(true)
    }

    let contributionsMainComponent: React.ReactNode | null = null
    if (isLoading) {
        contributionsMainComponent = <div>Loading</div>
    } else if (error !== undefined || contributionsClientInfo === undefined) {
        contributionsMainComponent = <div>{error}</div>
    } else {
        contributionsMainComponent = <ContributionsMain contributionsClientInfo={contributionsClientInfo} />
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <DateRangeInput
                initialFrom={undefined}
                initialTo={undefined}
                disabled={isLoading}
                handleRangeSelected={handleRangeSelected}
            />
            {contributionsMainComponent}
        </div>
    )
}
