import {
    CONTRIBUTIONS_FETCH_ERROR,
    CONTRIBUTIONS_FETCH_SUCCESS,
    CONTRIBUTIONS_LOADING,
    CONTRIBUTIONS_TRIGGER_CUSTOM_RANGE_QUERY,
    ContributionsAction,
} from './actions'
import { ContributionsState } from './Contributions'

export const reducer = (state: ContributionsState, action: ContributionsAction): ContributionsState => {
    switch (action.type) {
        case CONTRIBUTIONS_LOADING:
            return {
                isLoading: true,
                contributionsFetchError: undefined,
                contributionsClientInfo: undefined,
                queryDateRange: {},
                shouldTriggerRangeFetch: false,
            }
        case CONTRIBUTIONS_FETCH_ERROR:
            return {
                isLoading: false,
                contributionsFetchError: action.contributionsFetchError,
                contributionsClientInfo: undefined,
                queryDateRange: {},
                shouldTriggerRangeFetch: false,
            }
        case CONTRIBUTIONS_FETCH_SUCCESS:
            return {
                isLoading: false,
                contributionsFetchError: undefined,
                contributionsClientInfo: action.contributionsClientInfo,
                queryDateRange: {},
                shouldTriggerRangeFetch: false,
            }
        case CONTRIBUTIONS_TRIGGER_CUSTOM_RANGE_QUERY:
            return {
                isLoading: true,
                contributionsFetchError: undefined,
                contributionsClientInfo: undefined,
                queryDateRange: action.queryDateRange,
                shouldTriggerRangeFetch: true,
            }
    }
}
