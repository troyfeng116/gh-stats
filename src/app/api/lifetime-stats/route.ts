import { SERVICE_Call__computeLifetimeStats } from '@/server/services/lifetimeStats'
import { AUTH_NO_TOKEN_ERROR_RES, checkAuthHeaders } from '@/server/utils/authHeaders'
import { SHARED_APIFields__LifetimeStats } from '@/shared/models'

/*
Requires authentication
Returns total lifetime commits
*/

export const GET = async (request: Request): Promise<Response> => {
    console.log('GET /api/lifetime-stats')

    const token = checkAuthHeaders(request)
    if (token === undefined) {
        return new Response(JSON.stringify(AUTH_NO_TOKEN_ERROR_RES), {
            status: 401,
        })
    }

    const lifetimeCommitsRes: SHARED_APIFields__LifetimeStats = await SERVICE_Call__computeLifetimeStats(token)
    const { success, lifetimeStats } = lifetimeCommitsRes

    const status = !success || lifetimeStats === undefined ? 400 : 200

    return new Response(JSON.stringify(lifetimeCommitsRes), {
        status: status,
    })
}
