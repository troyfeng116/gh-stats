import { GH_API_getUser } from '@/server/lib/gh-api/users'
import { SHARED_APIFields_ValidateToken } from '@/shared/models'

export const validateAccessToken = async (accessToken: string): Promise<SHARED_APIFields_ValidateToken> => {
    const { success, error } = await GH_API_getUser(accessToken)
    return { success: success, error: error }
}
