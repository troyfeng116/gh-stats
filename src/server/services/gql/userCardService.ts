import { GH_GQL_getViewer } from '@/server/lib/gh-gql/users'
import { SHARED_GetUserCardAPIResponse } from '@/shared/models'

export const getUserCardDataFromGQL = async (accessToken: string): Promise<SHARED_GetUserCardAPIResponse> => {
    const { success, error, user } = await GH_GQL_getViewer(accessToken)

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
