import { SHARED_GetUserCardAPIResponse, SHARED_ListCommitsAPIResponse } from '@/models/shared'
import { listCommits } from '@/server/services/listCommitsService'
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

    if (!success || userCard === undefined) {
        return new Response(JSON.stringify(userCardRes), {
            status: 400,
        })
    }

    const commitsRes: SHARED_ListCommitsAPIResponse = await listCommits(token, 'troyfeng116', 'troyfeng116.github.io')
    const { commits } = commitsRes
    if (commits !== undefined) {
        console.log(commits.length)
    } else {
        console.log('commits undefined!')
    }

    return new Response(JSON.stringify(userCardRes), {
        status: 200,
    })
}
