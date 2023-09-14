'use client'

import React, { useCallback, useEffect, useReducer } from 'react'

import {
    CONTRIBUTIONS_FETCH_ERROR,
    CONTRIBUTIONS_FETCH_SUCCESS,
    CONTRIBUTIONS_LOADING,
    CONTRIBUTIONS_TRIGGER_CUSTOM_RANGE_QUERY,
} from './actions'
import ContributionsMain from './ContributionsMain'
import { reducer } from './reducer'

import DateRangeInput from '@/client/components/Reuse/DateRangeInput'
import { useAuth } from '@/client/components/Wrappers/AuthProvider'
import { contributionsAPI } from '@/client/lib/authAPI'
import { SHARED_Model__ContributionsClientInfo } from '@/shared/models/models/Contributions'

export interface ContributionsState {
    isLoading: boolean
    contributionsFetchError?: string
    contributionsClientInfo?: SHARED_Model__ContributionsClientInfo
    queryDateRange: { from?: string; to?: string }
    shouldTriggerRangeFetch: boolean
}

const initialContributionsState: ContributionsState = {
    isLoading: true,
    contributionsFetchError: undefined,
    contributionsClientInfo: undefined,
    queryDateRange: { from: undefined, to: undefined },
    shouldTriggerRangeFetch: false,
}

export const Contributions: React.FC = () => {
    const { accessToken } = useAuth()

    const [state, dispatch] = useReducer(reducer, initialContributionsState)
    const { isLoading, contributionsFetchError, contributionsClientInfo, queryDateRange, shouldTriggerRangeFetch } =
        state

    const fetchContributions = useCallback(async (accessToken: string, from?: string, to?: string) => {
        dispatch({ type: CONTRIBUTIONS_LOADING })
        const {
            success,
            error,
            contributionsClientInfo: updatedContributionsClientInfo,
        } = await contributionsAPI(accessToken, from, to)

        if (!success || updatedContributionsClientInfo === undefined) {
            dispatch({ type: CONTRIBUTIONS_FETCH_ERROR, contributionsFetchError: error })
        } else {
            dispatch({ type: CONTRIBUTIONS_FETCH_SUCCESS, contributionsClientInfo: updatedContributionsClientInfo })
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
        if (shouldTriggerRangeFetch && accessToken !== undefined) {
            const { from: curFrom, to: curTo } = queryDateRange
            // TODO: client-side validate dates
            fetchContributions(accessToken, curFrom, curTo)
        }
    }, [accessToken, shouldTriggerRangeFetch, queryDateRange])

    const handleRangeSelected = (fromDate: string | undefined, toDate: string | undefined) => {
        dispatch({ type: CONTRIBUTIONS_TRIGGER_CUSTOM_RANGE_QUERY, queryDateRange: { from: fromDate, to: toDate } })
    }

    let contributionsMainComponent: React.ReactNode | null = null
    if (isLoading) {
        contributionsMainComponent = <div>Loading</div>
    } else if (contributionsFetchError !== undefined || contributionsClientInfo === undefined) {
        contributionsMainComponent = <div>{contributionsFetchError}</div>
    } else {
        contributionsMainComponent = <ContributionsMain contributionsClientInfo={contributionsClientInfo} />
    }

    const dateRangeBounds = {
        min: new Date(contributionsClientInfo?.accountCreatedDate || 0).toLocaleDateString(),
        max: new Date().toUTCString(),
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <DateRangeInput
                rangeBounds={dateRangeBounds}
                initialFrom={undefined}
                initialTo={undefined}
                disabled={isLoading}
                handleRangeSelected={handleRangeSelected}
            />
            {contributionsMainComponent}
        </div>
    )
}
