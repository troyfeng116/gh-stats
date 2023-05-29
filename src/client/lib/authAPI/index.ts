import { getAPIWithAuth } from '../fetchAPI'

import { GetUserCardAPIResponse } from '@/models/shared'

/*
Authenticated APIs (must provide access token)
*/

export const getUserCardAPI = async (accessToken: string): Promise<GetUserCardAPIResponse> => {
    const res = await getAPIWithAuth('/api/user-card', accessToken)
    const getUserCardRes = res as GetUserCardAPIResponse
    return getUserCardRes
}
