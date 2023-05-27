import { DUMMY_TEST_API_RESPONSE, dummyAsyncFunction } from '@/server/utils'

export async function GET() {
    console.log('/api/test: GET')

    const res: string = await dummyAsyncFunction(JSON.stringify(DUMMY_TEST_API_RESPONSE), 1500)

    console.log(res)

    return new Response(res, {
        status: 200,
        headers: {},
    })
}
