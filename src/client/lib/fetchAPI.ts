/*
Make fetch API call from client to /api server routes
*/

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getAPI = async (url: string, headers?: any): Promise<any> => {
    console.log(`GET ${url}, headers ${JSON.stringify(headers)}`)

    headers = {
        ...headers,
        'Content-Type': 'application/json',
        Accept: 'application/json',
    }
    const res = await fetch(url, {
        method: 'GET',
        headers: headers,
    })

    const resJson = await res.json()
    console.log(`GET ${url} complete: ${JSON.stringify(resJson)}`)
    return resJson
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const postAPI = async (url: string, headers?: any, body?: any): Promise<any> => {
    console.log(`POST ${url}, headers ${JSON.stringify(headers)}, body ${JSON.stringify(body)}`)

    headers = {
        ...headers,
        'Content-Type': 'application/json',
        Accept: 'application/json',
    }
    body = body === undefined ? {} : body
    console.log(body)
    const res = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: headers,
    })

    const resJson = await res.json()
    console.log(`POST ${url} complete: ${JSON.stringify(resJson)}`)
    return resJson
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getAPIWithAuth = async (url: string, accessToken: string, headers?: any): Promise<any> => {
    return await getAPI(url, {
        ...headers,
        Authorization: `Bearer ${accessToken}`,
    })
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const postAPIWithAuth = async (url: string, accessToken: string, headers?: any, body?: any): Promise<any> => {
    return await postAPI(
        url,
        {
            ...headers,
            Authorization: `Bearer ${accessToken}`,
        },
        body,
    )
}
