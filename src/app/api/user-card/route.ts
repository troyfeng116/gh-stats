import { GetUserCardAPIResponse } from '@/models/shared'
import { GH_API_getUser } from '@/server/lib/gh-api/user'
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

    const { res, success, error } = await GH_API_getUser(token)
    if (!success || res === undefined) {
        const clientRes: GetUserCardAPIResponse = {
            success: false,
            error: error,
        }
        return new Response(JSON.stringify(clientRes), {
            status: 400,
        })
    }

    const { login, name, email, followers, following, created_at, public_repos, total_private_repos } = res

    const clientRes: GetUserCardAPIResponse = {
        success: true,
        userCard: {
            userId: login,
            name: name === null ? undefined : name,
            email: email == null ? undefined : email,
            followers: followers,
            following: following,
            createdAt: created_at,
            publicRepos: public_repos,
            privateRepos: total_private_repos,
            totalRepos: public_repos + total_private_repos,
        },
    }
    return new Response(JSON.stringify(clientRes), {
        status: 200,
    })
}
