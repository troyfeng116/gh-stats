// make fetch API call to /api routes

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getAPI = async (url: string, headers?: any): Promise<any> => {
    headers = {
        ...headers,
        'Content-Type': 'application/json',
        Accept: 'application/json',
    }
    const res = await fetch(url, {
        method: 'GET',
        headers: headers,
    })
    console.log('fetch get-token complete')
    const resJson = await res.json()
    return resJson
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const postAPI = async (url: string, headers?: any, body?: any): Promise<any> => {
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
    return resJson
}
