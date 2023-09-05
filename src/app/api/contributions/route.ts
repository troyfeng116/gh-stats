import { SERVICE_Call__getContributions as SERVICE_Call__getContributionsClientInfo } from '@/server/services/contributions'
import { AUTH_NO_TOKEN_ERROR_RES, checkAuthHeaders } from '@/server/utils/authHeaders'
import { SHARED_APIFields__Contributions } from '@/shared/models/apiFields/contributions'

export const GET = async (request: Request): Promise<Response> => {
    console.log('GET /api/contributions')

    const token = checkAuthHeaders(request)
    if (token === undefined) {
        return new Response(JSON.stringify(AUTH_NO_TOKEN_ERROR_RES), {
            status: 401,
        })
    }

    const contributionsRes: SHARED_APIFields__Contributions = await SERVICE_Call__getContributionsClientInfo(token)
    const { success, contributionsClientInfo } = contributionsRes

    const status = !success || contributionsClientInfo === undefined ? 400 : 200

    return new Response(JSON.stringify(contributionsRes), {
        status: status,
    })
}
