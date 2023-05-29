import { ValidateTokenAPIResponse } from '@/models/shared'
import { GH_getUserAPI } from '@/server/lib/gh-auth'
import { AUTH_NO_TOKEN_ERROR_RES } from '@/server/utils/authHeaders'

export const POST = async (request: Request): Promise<Response> => {
    console.log('/api/validate-token POST')

    const body = await request.json()
    const { accessToken } = body
    if (accessToken === undefined) {
        return new Response(JSON.stringify(AUTH_NO_TOKEN_ERROR_RES), {
            status: 401,
        })
    }

    const { success, error } = await GH_getUserAPI(accessToken)
    if (!success) {
        const clientRes: ValidateTokenAPIResponse = {
            success: false,
            error: error,
        }
        return new Response(JSON.stringify(clientRes), {
            status: 200,
        })
    }

    const clientRes: ValidateTokenAPIResponse = {
        success: true,
    }
    return new Response(JSON.stringify(clientRes), {
        status: 200,
    })
}
