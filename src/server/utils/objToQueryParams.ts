// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const objToQueryParamsString = (obj: object): string => {
    return Object.entries(obj)
        .map(([key, val]) => `${encodeURIComponent(key)}=${encodeURIComponent(val as string | number | boolean)}`)
        .join('&')
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getURLWithQueryParams = (url: string, params?: object): string => {
    if (params !== undefined) {
        url = `${url}?${objToQueryParamsString(params)}`
    }
    return url
}
