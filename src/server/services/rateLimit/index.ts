import { GH_GQL_Call__RateLimit } from '@/server/lib/gh-gql/RateLimit'
import { SHARED_APIFields__RateLimit } from '@/shared/models/apiFields/rateLimit'
import { SHARED_Model__RateLimit } from '@/shared/models/models/RateLimit'

export const SERVICE_Call__getRateLimit = async (accessToken: string): Promise<SHARED_APIFields__RateLimit> => {
    const { success: rateLimitSuccess, error: rateLimitError, rateLimit } = await GH_GQL_Call__RateLimit(accessToken)

    if (!rateLimitSuccess || rateLimit === undefined) {
        return { success: false, error: rateLimitError, rateLimitClientInfo: undefined }
    }

    const { used, limit, resetAt, remaining } = rateLimit
    if (remaining <= Math.max(limit * 0.02, 100)) {
        const resetDateStr = new Date(resetAt).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            weekday: 'long',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        })
        return {
            success: true,
            rateLimitClientInfo: {
                rateLimit: rateLimit as SHARED_Model__RateLimit,
                isRateLimited: true,
                rateLimitedMessage: `Github imposes an API rate limit of ${limit} queries, and you have used ${used} (${remaining} remaining). Please retry after ${resetDateStr}.`,
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
            rateOkMessage: `Used ${used} queries out of Github API limit ${limit} (${remaining} remaining)`,
        },
    }
}
