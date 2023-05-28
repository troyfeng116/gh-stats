import { postAPI } from './fetchAPI'

import { GetTokenAPIResponse, ValidateTokenAPIResponse } from '@/models/api'

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

export const refreshTokenAPI = async (refreshToken: string): Promise<GetTokenAPIResponse> => {
    const payload = { refreshToken: refreshToken }
    const res = await postAPI('/api/refresh-token', {}, payload)
    const refreshResponse = res as GetTokenAPIResponse
    return refreshResponse
}
