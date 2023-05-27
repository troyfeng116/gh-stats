import { GetTokenAPIResponse } from '@/models/api'
import { GH_CLIENT_ID, GH_CLIENT_SECRET } from '@/server/constants'

export const POST = async (request: Request): Promise<Response> => {
    console.log('/api/get-token POST')

    const reqJson = await request.json()

    // const { body } = reqJson
    // if (body === null || body === undefined) {
    //     const clientRes: GetTokenAPIResponse = {
    //         success: false,
    //         error: 'body null/undefined',
    //     }
    //     return new Response(JSON.stringify(clientRes), {
    //         status: 400,
    //     })
    // }

    const { code } = reqJson
    if (code === undefined) {
        const clientRes: GetTokenAPIResponse = {
            success: false,
            error: 'body must include client code',
        }
        return new Response(JSON.stringify(clientRes), {
            status: 400,
        })
    }

    const payload = {
        code: code,
        client_id: GH_CLIENT_ID,
        client_secret: GH_CLIENT_SECRET,
    }
    console.log(payload)

    const res = await fetch('https://github.com/login/oauth/access_token', {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
    })

    const resJson = await res.json()
    console.log(resJson)

    const { error, error_description, access_token } = resJson
    if (error !== undefined || access_token === undefined) {
        const clientRes: GetTokenAPIResponse = {
            success: false,
            error: `${error}: unable to retrieve access token (${error_description})`,
        }
        return new Response(JSON.stringify(clientRes), {
            status: 404,
        })
    }

    const clientRes: GetTokenAPIResponse = {
        success: true,
        accessToken: access_token as string,
    }
    return new Response(JSON.stringify(clientRes), {
        status: 200,
    })
}
