import { GH_API_Call__getUser } from '@/server/lib/gh-api/users'
import { GH_GQL_Call__Viewer } from '@/server/lib/gh-gql/Viewer'
import { SHARED_APIFields__GetUserCard } from '@/shared/models/apiFields'

export const SERVICE_Call__getUserCardDataFromGQL = async (
    accessToken: string,
): Promise<SHARED_APIFields__GetUserCard> => {
    const { success, error, viewer } = await GH_GQL_Call__Viewer(accessToken)

    if (!success || viewer === undefined) {
        return { success: false, error: error, userCard: undefined }
    }

    const {
        login,
        name,
        email,
        followers: { totalCount: followers },
        following: { totalCount: following },
        createdAt,
        repositories: { totalCount: totalRepos },
    } = viewer

    return {
        success: true,
        userCard: {
            userId: login,
            name: name === null ? undefined : name,
            email: email == null ? undefined : email,
            followers: followers,
            following: following,
            createdAt: createdAt,
            totalRepos: totalRepos,
        },
    }
}

export const getUserCardDataFromAPI = async (accessToken: string): Promise<SHARED_APIFields__GetUserCard> => {
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
            totalRepos: public_repos + total_private_repos,
        },
    }
}
