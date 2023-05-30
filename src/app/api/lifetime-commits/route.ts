/*
Requires authentication
Returns total lifetime commits
*/

import { SHARED_LifetimeCommitsAPIResponse } from '@/models/shared'
import { getLifetimeCommits } from '@/server/services/commitsService'
import { AUTH_NO_TOKEN_ERROR_RES, checkAuthHeaders } from '@/server/utils/authHeaders'

export const GET = async (request: Request): Promise<Response> => {
    console.log('GET /api/lifetime-commits')

    const token = checkAuthHeaders(request)
    if (token === undefined) {
        return new Response(JSON.stringify(AUTH_NO_TOKEN_ERROR_RES), {
            status: 401,
        })
    }

    const lifetimeCommitsRes: SHARED_LifetimeCommitsAPIResponse = await getLifetimeCommits(token)
    const { success, lifetimeCommits } = lifetimeCommitsRes

    const status = !success || lifetimeCommits === undefined ? 400 : 200

    return new Response(JSON.stringify(lifetimeCommitsRes), {
        status: status,
    })
}
