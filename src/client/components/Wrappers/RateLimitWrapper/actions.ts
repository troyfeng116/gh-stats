import { SHARED_Model__RateLimitClientInfo } from '@/shared/models/models/RateLimit'

export const RATE_LIMIT_LOADING = 'RATE_LIMIT_LOADING'
export const RATE_LIMIT_UNAUTH = 'RATE_LIMIT_UNAUTH'
export const RATE_LIMIT_AUTH_ERROR = 'RATE_LIMIT_AUTH_ERROR'
export const RATE_LIMIT_AUTH_RESPONSE = 'RATE_LIMIT_AUTH_RESPONSE'

interface RateLimitLoading {
    type: typeof RATE_LIMIT_LOADING
}

interface RateLimitUnauth {
    type: typeof RATE_LIMIT_UNAUTH
}

interface RateLimitAuthError {
    type: typeof RATE_LIMIT_AUTH_ERROR
    error?: string
}

interface RateLimitAuthResponse {
    type: typeof RATE_LIMIT_AUTH_RESPONSE
    rateLimit: SHARED_Model__RateLimitClientInfo
}

export type RateLimitWrapperAction = RateLimitLoading | RateLimitUnauth | RateLimitAuthError | RateLimitAuthResponse
