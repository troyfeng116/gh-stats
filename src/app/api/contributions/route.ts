import { SERVICE_Call__getContributions as SERVICE_Call__getContributionsClientInfo } from '@/server/services/contributions'
import { AUTH_NO_TOKEN_ERROR_RES, checkAuthHeaders } from '@/server/utils/authHeaders'
import { SHARED_APIFields__Contributions } from '@/shared/models/apiFields/contributions'

export const POST = async (request: Request): Promise<Response> => {
    const reqData = await request.json()
    console.log(`POST /api/contributions ${JSON.stringify(reqData)}`)

    const token = checkAuthHeaders(request)
    if (token === undefined) {
        return new Response(JSON.stringify(AUTH_NO_TOKEN_ERROR_RES), {
            status: 401,
        })
    }

    const { from = undefined, to = undefined } = reqData

    const contributionsRes: SHARED_APIFields__Contributions = await SERVICE_Call__getContributionsClientInfo(
        token,
        from,
        to,
    )
    const { success, contributionsClientInfo } = contributionsRes

    const status = !success || contributionsClientInfo === undefined ? 400 : 200

    return new Response(JSON.stringify(contributionsRes), {
        status: status,
    })
}
