import { BaseAPIResponse } from '@/models/shared'

export const AUTH_NO_TOKEN_ERROR_RES: BaseAPIResponse = {
    success: false,
    error: 'must provide GitHub access token',
}

export const checkAuthHeaders = (request: Request): string | undefined => {
    const { headers } = request
    const authHeader = headers.get('Authorization')
    if (authHeader === null) {
        return undefined
    }

    if (authHeader.startsWith('Bearer ')) {
        const token = authHeader.substring('Bearer '.length, authHeader.length)
        return token
    }

    return undefined
}
