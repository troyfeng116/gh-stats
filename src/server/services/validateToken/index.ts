import { GH_API_Call__getUser } from '@/server/lib/gh-api/users'
import { SHARED_APIFields__ValidateToken } from '@/shared/models'

export const validateAccessToken = async (accessToken: string): Promise<SHARED_APIFields__ValidateToken> => {
    const { success, error } = await GH_API_Call__getUser(accessToken)
    return { success: success, error: error }
}
