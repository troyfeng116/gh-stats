import { getAPIWithAuth } from '../fetchAPI'

import { SHARED_GetLifetimeStatsAPIResponse, SHARED_GetUserCardAPIResponse } from '@/shared/models'

/*
Authenticated APIs (must provide access token)
*/

export const getUserCardAPI = async (accessToken: string): Promise<SHARED_GetUserCardAPIResponse> => {
    const res = await getAPIWithAuth('/api/user-card', accessToken)
    const getUserCardRes = res as SHARED_GetUserCardAPIResponse
    return getUserCardRes
}

export const lifetimeStatsAPI = async (accessToken: string): Promise<SHARED_GetLifetimeStatsAPIResponse> => {
    const res = await getAPIWithAuth('/api/lifetime-stats', accessToken)
    const lifetimeStatsRes = res as SHARED_GetLifetimeStatsAPIResponse
    return lifetimeStatsRes
}
