import { getAPIWithAuth } from '../fetchAPI'

import { SHARED_APIFields__GetLifetimeStats, SHARED_APIFields__GetUserCard } from '@/shared/models'

/*
Authenticated APIs (must provide access token)
*/

export const getUserCardAPI = async (accessToken: string): Promise<SHARED_APIFields__GetUserCard> => {
    const res = await getAPIWithAuth('/api/user-card', accessToken)
    const getUserCardRes = res as SHARED_APIFields__GetUserCard
    return getUserCardRes
}

export const lifetimeStatsAPI = async (accessToken: string): Promise<SHARED_APIFields__GetLifetimeStats> => {
    const res = await getAPIWithAuth('/api/lifetime-stats', accessToken)
    const lifetimeStatsRes = res as SHARED_APIFields__GetLifetimeStats
    return lifetimeStatsRes
}
