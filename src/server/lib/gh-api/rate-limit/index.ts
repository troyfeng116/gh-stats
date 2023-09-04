import { BASE_GH_API_Call__getWithAuth, GH_API_Response__BASE } from '..'

import { GH_API_Obj__RateLimit } from './model'

interface GH_API_Response__rateLimit extends GH_API_Response__BASE {
    allRateLimits?: GH_API_Obj__RateLimit
}

export const GH_API_Call__rateLimit = async (accessToken: string): Promise<GH_API_Response__rateLimit> => {
    const url = '/rate_limit'

    const res = await BASE_GH_API_Call__getWithAuth(url, accessToken)
    const { status, statusText } = res

    if (status !== 200) {
        return { allRateLimits: undefined, success: false, error: `error ${status}: ${statusText}` }
    }

    const resJson: GH_API_Obj__RateLimit = (await res.json()) as GH_API_Obj__RateLimit
    // console.log(resJson)

    return { allRateLimits: resJson, success: true }
}
