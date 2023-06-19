import { postAPI } from '../fetchAPI'

import { SHARED_APIFields__GetToken } from '@/shared/models/apiFields/getToken'
import { SHARED_APIFields__ValidateToken } from '@/shared/models/apiFields/validateToken'

/*
Unauthenticated APIs (no access token needed)
*/

// TODO: demo screen? (with my data: add my token as env var on backend)

export const getTokenAPI = async (code: string): Promise<SHARED_APIFields__GetToken> => {
    const payload = { code: code }
    const res = await postAPI('/api/get-token', {}, payload)
    const tokenResponse = res as SHARED_APIFields__GetToken
    return tokenResponse
}

export const validateTokenAPI = async (accessToken: string): Promise<SHARED_APIFields__ValidateToken> => {
    const payload = { accessToken: accessToken }
    const res = await postAPI('/api/validate-token', {}, payload)
    const validateResponse = res as SHARED_APIFields__ValidateToken
    return validateResponse
}
