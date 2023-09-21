import { SHARED_Model__ContributionsClientInfo } from '@/shared/models/models/Contributions'

export const CONTRIBUTIONS_LOADING = 'CONTRIBUTIONS_LOADING'
export const CONTRIBUTIONS_FETCH_ERROR = 'CONTRIBUTIONS_FETCH_ERROR'
export const CONTRIBUTIONS_FETCH_SUCCESS = 'CONTRIBUTIONS_FETCH_SUCCESS'
export const CONTRIBUTIONS_TRIGGER_CUSTOM_RANGE_QUERY = 'CONTRIBUTIONS_TRIGGER_CUSTOM_RANGE_QUERY'

interface ContributionsLoading {
    type: typeof CONTRIBUTIONS_LOADING
}

interface ContributionsFetchError {
    type: typeof CONTRIBUTIONS_FETCH_ERROR
    contributionsFetchError?: string
}

interface ContributionsFetchSuccess {
    type: typeof CONTRIBUTIONS_FETCH_SUCCESS
    contributionsClientInfo: SHARED_Model__ContributionsClientInfo
}

interface ContributionsTriggerCustomRangeQuery {
    type: typeof CONTRIBUTIONS_TRIGGER_CUSTOM_RANGE_QUERY
    queryDateRange: { from?: string; to?: string }
}

export type ContributionsAction =
    | ContributionsLoading
    | ContributionsFetchError
    | ContributionsFetchSuccess
    | ContributionsTriggerCustomRangeQuery
