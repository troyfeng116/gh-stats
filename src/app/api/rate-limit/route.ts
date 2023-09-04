import { SERVICE_Call__getRateLimit } from '@/server/services/rateLimit'
import { AUTH_NO_TOKEN_ERROR_RES, checkAuthHeaders } from '@/server/utils/authHeaders'
import { SHARED_APIFields__RateLimit } from '@/shared/models/apiFields/rateLimit'

/*
Requires authentication
Returns rate limit information
*/

export const GET = async (request: Request): Promise<Response> => {
    console.log('GET /api/rate-limit')

    const token = checkAuthHeaders(request)
    if (token === undefined) {
        return new Response(JSON.stringify(AUTH_NO_TOKEN_ERROR_RES), {
            status: 401,
        })
    }

    const rateLimitRes: SHARED_APIFields__RateLimit = await SERVICE_Call__getRateLimit(token)
    const { success, rateLimitClientInfo } = rateLimitRes

    const status = !success || rateLimitClientInfo === undefined ? 400 : 200

    return new Response(JSON.stringify(rateLimitRes), {
        status: status,
    })
}
