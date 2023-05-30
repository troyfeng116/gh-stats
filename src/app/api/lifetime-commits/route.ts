/*
Requires authentication
Returns total lifetime commits
*/

import { countLifetimeCommits } from '@/server/services/commitsService'
import { AUTH_NO_TOKEN_ERROR_RES, checkAuthHeaders } from '@/server/utils/authHeaders'
import { SHARED_CountCommitsResponse } from '@/shared/models'

export const GET = async (request: Request): Promise<Response> => {
    console.log('GET /api/lifetime-commits')

    const token = checkAuthHeaders(request)
    if (token === undefined) {
        return new Response(JSON.stringify(AUTH_NO_TOKEN_ERROR_RES), {
            status: 401,
        })
    }

    const lifetimeCommitsRes: SHARED_CountCommitsResponse = await countLifetimeCommits(token)
    const { success, numCommits } = lifetimeCommitsRes

    const status = !success || numCommits === undefined ? 400 : 200

    return new Response(JSON.stringify(lifetimeCommitsRes), {
        status: status,
    })
}
