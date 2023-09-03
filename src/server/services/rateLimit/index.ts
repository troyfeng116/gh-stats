import { GH_GQL_Call__RateLimit } from '@/server/lib/gh-gql/RateLimit'
import { SHARED_APIFields__RateLimit } from '@/shared/models/apiFields/rateLimit'
import { SHARED_Model__RateLimit } from '@/shared/models/models/RateLimit'

export const SERVICE_Call__getRateLimit = async (accessToken: string): Promise<SHARED_APIFields__RateLimit> => {
    const { success: rateLimitSuccess, error: rateLimitError, rateLimit } = await GH_GQL_Call__RateLimit(accessToken)

    if (!rateLimitSuccess || rateLimit === undefined) {
        return { success: false, error: rateLimitError, rateLimit: undefined }
    }

    return { success: true, rateLimit: rateLimit as SHARED_Model__RateLimit }
}
