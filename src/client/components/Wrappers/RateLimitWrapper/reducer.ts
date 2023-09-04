import {
    RATE_LIMIT_AUTH_ERROR,
    RATE_LIMIT_AUTH_RESPONSE,
    RATE_LIMIT_LOADING,
    RATE_LIMIT_UNAUTH,
    RateLimitWrapperAction,
} from './actions'
import { RateLimitWrapperState } from './RateLimitWrapper'

export const reducer = (state: RateLimitWrapperState, action: RateLimitWrapperAction): RateLimitWrapperState => {
    switch (action.type) {
        case RATE_LIMIT_LOADING:
            return { isLoading: true, error: undefined, rateLimitInfo: undefined }
        case RATE_LIMIT_UNAUTH:
            return { isLoading: false, error: undefined, rateLimitInfo: undefined }
        case RATE_LIMIT_AUTH_ERROR:
            return { isLoading: false, error: action.error, rateLimitInfo: undefined }
        case RATE_LIMIT_AUTH_RESPONSE:
            return { isLoading: false, error: undefined, rateLimitInfo: action.rateLimit }
    }
}
