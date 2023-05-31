import { GH_API_getUser } from '@/server/lib/gh-api/users'
import { GH_GQL_getViewer } from '@/server/lib/gh-gql/users'
import { GH_GQL_GET_VIEWER_QUERY } from '@/server/lib/gh-gql/users/query'
import { SHARED_GetUserCardAPIResponse } from '@/shared/models'

export const getUserCardDataFromGQL = async (accessToken: string): Promise<SHARED_GetUserCardAPIResponse> => {
    const { success, error, user } = await GH_GQL_getViewer(accessToken, GH_GQL_GET_VIEWER_QUERY)

    if (!success || user === undefined) {
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
    } = user

    return {
        success: true,
        userCard: {
            userId: login,
            name: name === null ? undefined : name,
            email: email == null ? undefined : email,
            followers: followers,
            following: following,
            createdAt: createdAt,
            publicRepos: 0,
            privateRepos: 0,
            totalRepos: totalRepos,
        },
    }
}

export const getUserCardData = async (accessToken: string): Promise<SHARED_GetUserCardAPIResponse> => {
    const { user, success, error } = await GH_API_getUser(accessToken)

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
