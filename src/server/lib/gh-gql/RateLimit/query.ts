export const GH_GQL_Query__RateLimit = `query RateLimit {
    rateLimit {
        cost
        limit
        used
        resetAt
        remaining
    }
}
`

export interface GH_GQL_Schema__RateLimit {
    cost: number
    limit: number
    used: number
    resetAt: string // 2023-09-03T21:39:58Z
    remaining: number
}
