import { GH_GQL_Call__Viewer } from '@/server/lib/gh-gql/Viewer'
import { SHARED_APIFields_GetUserCard } from '@/shared/models'

export const getUserCardDataFromGQL = async (accessToken: string): Promise<SHARED_APIFields_GetUserCard> => {
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
            publicRepos: 0,
            privateRepos: 0,
            totalRepos: totalRepos,
        },
    }
}
