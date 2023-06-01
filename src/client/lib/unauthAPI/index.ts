import { postAPI } from '../fetchAPI'

import { SHARED_APIFields_GetToken, SHARED_APIFields_ValidateToken } from '@/shared/models'

/*
Unauthenticated APIs (no access token needed)
*/

// TODO: demo screen? (with my data: add my token as env var on backend)

export const getTokenAPI = async (code: string): Promise<SHARED_APIFields_GetToken> => {
    const payload = { code: code }
    const res = await postAPI('/api/get-token', {}, payload)
    const tokenResponse = res as SHARED_APIFields_GetToken
    return tokenResponse
}

export const validateTokenAPI = async (accessToken: string): Promise<SHARED_APIFields_ValidateToken> => {
    const payload = { accessToken: accessToken }
    const res = await postAPI('/api/validate-token', {}, payload)
    const validateResponse = res as SHARED_APIFields_ValidateToken
    return validateResponse
}
