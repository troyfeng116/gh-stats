import { GH_API_Call__rateLimit } from '@/server/lib/gh-api/rate-limit'
import { GH_GQL_Call__RateLimit } from '@/server/lib/gh-gql/RateLimit'
import { SHARED_APIFields__RateLimit } from '@/shared/models/apiFields/rateLimit'
import { SHARED_Model__RateLimit } from '@/shared/models/models/RateLimit'

const isNearRateLimit = (rateLimitInfo: { used: number; limit: number; remaining: number }): boolean => {
    const { limit, remaining } = rateLimitInfo
    return remaining <= Math.max(limit * 0.02, 100)
}

const getResetDateStr = (resetAt: string | number): string => {
    return new Date(resetAt).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    })
}

const getRateLimitedMessage = (
    rateLimitInfo: {
        used: number
        limit: number
        remaining: number
        resetAtStr: string
    },
    isGraphql = true,
): string => {
    const { used, limit, remaining, resetAtStr } = rateLimitInfo
    const rateLimitType = isGraphql ? 'GraphQL queries' : 'API requests'
    return `Github imposes a rate limit of ${limit} ${rateLimitType}, and you have used ${used} (${remaining} remaining). Please retry after ${resetAtStr}.`
}

const getRateOkMessage = (rateLimitInfo: {
    used: number
    limit: number
    remaining: number
    resetAtStr: string
}): string => {
    const { used, limit, remaining, resetAtStr } = rateLimitInfo
    return `Used ${used} queries out of Github API limit ${limit} (${remaining} remaining, resets at ${resetAtStr})`
}

export const SERVICE_Call__getRateLimit = async (accessToken: string): Promise<SHARED_APIFields__RateLimit> => {
    const { success: rateLimitSuccess, error: rateLimitError, rateLimit } = await GH_GQL_Call__RateLimit(accessToken)

    if (!rateLimitSuccess || rateLimit === undefined) {
        return { success: false, error: rateLimitError, rateLimitClientInfo: undefined }
    }

    const { resetAt } = rateLimit
    const resetAtStr = getResetDateStr(resetAt)
    if (isNearRateLimit({ ...rateLimit })) {
        return {
            success: true,
            rateLimitClientInfo: {
                rateLimit: rateLimit as SHARED_Model__RateLimit,
                isRateLimited: true,
                rateLimitedMessage: getRateLimitedMessage({ ...rateLimit, resetAtStr: resetAtStr }),
                rateOkMessage: undefined,
            },
        }
    }

    return {
        success: true,
        rateLimitClientInfo: {
            rateLimit: rateLimit as SHARED_Model__RateLimit,
            isRateLimited: false,
            rateLimitedMessage: undefined,
            rateOkMessage: getRateOkMessage({ ...rateLimit, resetAtStr: resetAtStr }),
        },
    }
}

export const SERVICE_Call__getRateLimitViaAPI = async (accessToken: string): Promise<SHARED_APIFields__RateLimit> => {
    const {
        success: rateLimitSuccess,
        error: rateLimitError,
        allRateLimits,
    } = await GH_API_Call__rateLimit(accessToken)

    if (!rateLimitSuccess || allRateLimits === undefined) {
        return { success: false, error: rateLimitError, rateLimitClientInfo: undefined }
    }

    const { resources } = allRateLimits
    const { core, graphql } = resources

    if (isNearRateLimit({ ...core })) {
        const { reset } = core
        const resetAtStr = getResetDateStr(reset * 1000)
        return {
            success: true,
            rateLimitClientInfo: {
                isRateLimited: true,
                rateLimitedMessage: getRateLimitedMessage({ ...core, resetAtStr: resetAtStr }, false),
                rateOkMessage: undefined,
            },
        }
    }

    if (isNearRateLimit({ ...graphql })) {
        const { reset } = graphql
        const resetAtStr = getResetDateStr(reset * 1000)
        return {
            success: true,
            rateLimitClientInfo: {
                isRateLimited: true,
                rateLimitedMessage: getRateLimitedMessage({ ...graphql, resetAtStr: resetAtStr }),
                rateOkMessage: undefined,
            },
        }
    }

    return {
        success: true,
        rateLimitClientInfo: {
            isRateLimited: false,
            rateLimitedMessage: undefined,
            rateOkMessage: getRateOkMessage({ ...graphql, resetAtStr: getResetDateStr(graphql.reset * 1000) }),
        },
    }
}
