export interface SHARED_Model__RateLimit {
    cost: number
    limit: number
    used: number
    resetAt: string // 2023-09-03T21:39:58Z
    remaining: number
}

export interface SHARED_Model__RateLimitClientInfo {
    rateLimit: SHARED_Model__RateLimit
    isRateLimited: boolean
    rateOkMessage?: string
    rateLimitedMessage?: string
}
