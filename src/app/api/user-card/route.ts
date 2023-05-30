import { SHARED_GetUserCardAPIResponse } from '@/models/shared'
import { getUserCardData } from '@/server/services/userCardService'
import { AUTH_NO_TOKEN_ERROR_RES, checkAuthHeaders } from '@/server/utils/authHeaders'

/*
Requires authentication
Retrieve basic user card statistics
*/

export const GET = async (request: Request): Promise<Response> => {
    console.log('GET /api/user-card')

    const token = checkAuthHeaders(request)
    if (token === undefined) {
        return new Response(JSON.stringify(AUTH_NO_TOKEN_ERROR_RES), {
            status: 401,
        })
    }

    const userCardRes: SHARED_GetUserCardAPIResponse = await getUserCardData(token)
    const { success, userCard } = userCardRes

    const status = !success || userCard === undefined ? 400 : 200

    return new Response(JSON.stringify(userCardRes), {
        status: status,
    })
}
