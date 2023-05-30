import { getAPIWithAuth } from '../fetchAPI'

import { SHARED_GetUserCardAPIResponse, SHARED_LifetimeCommitsAPIResponse } from '@/models/shared'

/*
Authenticated APIs (must provide access token)
*/

export const getUserCardAPI = async (accessToken: string): Promise<SHARED_GetUserCardAPIResponse> => {
    const res = await getAPIWithAuth('/api/user-card', accessToken)
    const getUserCardRes = res as SHARED_GetUserCardAPIResponse
    return getUserCardRes
}

export const lifeTimeCommitsAPI = async (accessToken: string): Promise<SHARED_LifetimeCommitsAPIResponse> => {
    const res = await getAPIWithAuth('/api/lifetime-commits', accessToken)
    const lifetimeCommitsRes = res as SHARED_LifetimeCommitsAPIResponse
    return lifetimeCommitsRes
}
