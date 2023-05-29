import { postAPI } from '../fetchAPI'

import { GetTokenAPIResponse, ValidateTokenAPIResponse } from '@/models/shared'

/*
Unauthenticated APIs (no access token needed)
*/

// TODO: demo screen? (with my data: add my token as env var on backend)

export const getTokenAPI = async (code: string): Promise<GetTokenAPIResponse> => {
    const payload = { code: code }
    const res = await postAPI('/api/get-token', {}, payload)
    const tokenResponse = res as GetTokenAPIResponse
    return tokenResponse
}

export const validateTokenAPI = async (accessToken: string): Promise<ValidateTokenAPIResponse> => {
    const payload = { accessToken: accessToken }
    const res = await postAPI('/api/validate-token', {}, payload)
    const validateResponse = res as ValidateTokenAPIResponse
    return validateResponse
}
