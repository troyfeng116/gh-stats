import { GH_API_Call__getUser } from '@/server/lib/gh-api/users'
import { SHARED_APIFields_GetUserCard } from '@/shared/models'

export const getUserCardData = async (accessToken: string): Promise<SHARED_APIFields_GetUserCard> => {
    const { user, success, error } = await GH_API_Call__getUser(accessToken)

    if (!success || user === undefined) {
        return { success: false, error: error, userCard: undefined }
    }

    const { login, name, email, followers, following, created_at, public_repos, total_private_repos } = user

    return {
        success: true,
        userCard: {
            userId: login,
            name: name === null ? undefined : name,
            email: email == null ? undefined : email,
            followers: followers,
            following: following,
            createdAt: created_at,
            publicRepos: public_repos,
            privateRepos: total_private_repos,
            totalRepos: public_repos + total_private_repos,
        },
    }
}
