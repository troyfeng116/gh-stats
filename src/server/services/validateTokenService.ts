import { SHARED_ValidateTokenAPIResponse } from '@/models/shared'
import { GH_API_getUser } from '@/server/lib/gh-api/user'

export const validateAccessToken = async (accessToken: string): Promise<SHARED_ValidateTokenAPIResponse> => {
    const { success, error } = await GH_API_getUser(accessToken)
    return { success: success, error: error }
}
