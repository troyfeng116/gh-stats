// import { test } from '@/server/lib/git-spawn'
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

    // await test(token, 'troyfeng116', 'dino-game')
    // await test(token, 'troyfeng116', 'troyfeng116.github.io')

    const userCardRes: SHARED_APIFields__UserCard = await SERVICE_Call__getUserCardDataFromGQL(token)
    const { success, userCard } = userCardRes

    const status = !success || userCard === undefined ? 400 : 200

    return new Response(JSON.stringify(userCardRes), {
        status: status,
    })
}
