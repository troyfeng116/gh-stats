import { ValidateTokenAPIResponse } from '@/models/api'
import { GH_getUserAPI } from '@/server/lib/gh-auth'

export const POST = async (request: Request): Promise<Response> => {
    console.log('/api/validate-token POST')

    const body = await request.json()
    const { accessToken } = body
    if (accessToken === undefined) {
        const clientRes: ValidateTokenAPIResponse = {
            success: false,
            error: 'body must include access token',
        }
        return new Response(JSON.stringify(clientRes), {
            status: 400,
        })
    }

    const res = await GH_getUserAPI(accessToken)
    if (res === undefined) {
        const clientRes: ValidateTokenAPIResponse = {
            success: false,
            error: 'unable to get user',
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
