import { postAPI } from './fetchAPI'

import { GetTokenAPIResponse } from '@/models/api'

export const getTokenAPI = async (code: string): Promise<GetTokenAPIResponse> => {
    const payload = { code: code }
    const res = await postAPI('/api/get-token', {}, payload)
    console.log('fetch get-token complete')
    const tokenResponse = res as GetTokenAPIResponse
    return tokenResponse
}
