/*
This folder contains wrappers around raw requests to the GitHub GraphQL API
https://docs.github.com/en/graphql
*/

const BASE_GH_GQL_API_URL = 'https://api.github.com/graphql'

/*
Make authenticated calls to GitHub GraphQL API
Return raw `Response` objects
*/

export const PAGE_SIZE = 100

export interface GH_GQL_Response__BASE {
    success: boolean
    error?: string
}

export interface GH_GQL_RawResponse_BASE {
    errors?: { message: string }[]
}

export const BASE_GH_GQL_Call__makeQueryWithAuth = async (
    accessToken: string,
    query: string,
    variables?: object,
): Promise<Response> => {
    const payload = {
        query: query,
        variables: variables,
    }
    // console.log(JSON.stringify(payload))
    const res = await fetch(`${BASE_GH_GQL_API_URL}`, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: 'application/json',
            // TODO: caching (rate limit)
            // 'If-Modified-Since': new Date(Date.now() - 60 * 60 * 1000).toUTCString(),
        },
    })

    // console.log(res)
    // console.log(res.headers)

    return res
}
