import { SERVICE_Call__getUserCardDataFromGQL } from '@/server/services/userCard'
import { AUTH_NO_TOKEN_ERROR_RES, checkAuthHeaders } from '@/server/utils/authHeaders'
import { SHARED_APIFields__UserCard } from '@/shared/models/apiFields/userCard'

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

    const userCardRes: SHARED_APIFields__UserCard = await SERVICE_Call__getUserCardDataFromGQL(token)
    const { success, userCardClientInfo } = userCardRes

    const status = !success || userCardClientInfo === undefined ? 400 : 200

    return new Response(JSON.stringify(userCardRes), {
        status: status,
    })
}
