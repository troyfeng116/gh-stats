import { getAPIWithAuth } from '../fetchAPI'

import { SHARED_GetUserCardAPIResponse } from '@/models/shared'

/*
Authenticated APIs (must provide access token)
*/

export const getUserCardAPI = async (accessToken: string): Promise<SHARED_GetUserCardAPIResponse> => {
    const res = await getAPIWithAuth('/api/user-card', accessToken)
    const getUserCardRes = res as SHARED_GetUserCardAPIResponse
    return getUserCardRes
}
