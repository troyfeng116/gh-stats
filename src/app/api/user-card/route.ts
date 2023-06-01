// import { getUserCardData } from '@/server/services/userCardService'
import { getUserCardDataFromGQL } from '@/server/services/gql/userCardService'
import { AUTH_NO_TOKEN_ERROR_RES, checkAuthHeaders } from '@/server/utils/authHeaders'
import { SHARED_APIFields_GetUserCard } from '@/shared/models'

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

    // const userCardRes: SHARED_GetUserCardAPIResponse = await getUserCardData(token)
    const userCardRes: SHARED_APIFields_GetUserCard = await getUserCardDataFromGQL(token)
    // const userCardRes: SHARED_GetUserCardAPIResponse = {
    //     success: true,
    //     userCard: {
    //         userId: 'troyfeng999',
    //         name: 'Troy Feng',
    //         email: 'troy9@gmail.com',
    //         followers: 5,
    //         following: 5,
    //         createdAt: '4/8/2020, 11:07:35 PM',
    //         publicRepos: 20,
    //         privateRepos: 9,
    //         totalRepos: 29,
    //     },
    // }
    const { success, userCard } = userCardRes

    const status = !success || userCard === undefined ? 400 : 200

    return new Response(JSON.stringify(userCardRes), {
        status: status,
    })
}
