import { validateAccessToken } from '@/server/services/validateToken'
import { AUTH_NO_TOKEN_ERROR_RES } from '@/server/utils/authHeaders'
import { SHARED_APIFields__ValidateToken } from '@/shared/models/apiFields'

export const POST = async (request: Request): Promise<Response> => {
    console.log('POST /api/validate-token')

    const body = await request.json()
    const { accessToken } = body
    if (accessToken === undefined) {
        return new Response(JSON.stringify(AUTH_NO_TOKEN_ERROR_RES), {
            status: 401,
        })
    }

    const validateRes: SHARED_APIFields__ValidateToken = await validateAccessToken(accessToken)
    return new Response(JSON.stringify(validateRes), {
        status: 200,
    })
}
