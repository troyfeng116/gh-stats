// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const objToQueryParamsString = (obj: any): string => {
    return Object.entries(obj)
        .map(([key, val]) => `${encodeURIComponent(key)}=${encodeURIComponent(val as string | number | boolean)}`)
        .join('&')
}
