import { postAPI } from '../fetchAPI'

import { SHARED_GetTokenAPIResponse, SHARED_ValidateTokenAPIResponse } from '@/models/shared'

/*
Unauthenticated APIs (no access token needed)
*/

// TODO: demo screen? (with my data: add my token as env var on backend)

export const getTokenAPI = async (code: string): Promise<SHARED_GetTokenAPIResponse> => {
    const payload = { code: code }
    const res = await postAPI('/api/get-token', {}, payload)
    const tokenResponse = res as SHARED_GetTokenAPIResponse
    return tokenResponse
}

export const validateTokenAPI = async (accessToken: string): Promise<SHARED_ValidateTokenAPIResponse> => {
    const payload = { accessToken: accessToken }
    const res = await postAPI('/api/validate-token', {}, payload)
    const validateResponse = res as SHARED_ValidateTokenAPIResponse
    return validateResponse
}
