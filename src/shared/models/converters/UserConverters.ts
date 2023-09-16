import { SHARED_Model__UserCard } from '../models/UserCard'

import { GH_API_Obj__User } from '@/server/lib/gh-api/users/model'
import { GH_GQL_Schema__Viewer } from '@/server/lib/gh-gql/Viewer/query'

export const CONVERTER__viewerSchemaToSharedUserCard = (
    viewerSchema: GH_GQL_Schema__Viewer,
): SHARED_Model__UserCard => {
    const {
        login,
        name,
        email,
        followers: { totalCount: followers },
        following: { totalCount: following },
        createdAt,
        avatarUrl,
        repositories: { totalCount: totalPublicRepos },
        pullRequests: { totalCount: totalMergedPRs },
    } = viewerSchema

    return {
        userId: login,
        name: name === null ? undefined : name,
        email: email == null ? undefined : email,
        followers: followers,
        following: following,
        createdAt: createdAt,
        avatarUrl: avatarUrl,
        totalPublicRepos: totalPublicRepos,
        totalMergedPRs: totalMergedPRs,
    }
}

export const CONVERTER__userObjToSharedUserCard = (user: GH_API_Obj__User): SHARED_Model__UserCard => {
    const { login, name, email, followers, following, created_at, public_repos, total_private_repos, avatar_url } = user

    return {
        userId: login,
        name: name === null ? undefined : name,
        email: email == null ? undefined : email,
        followers: followers,
        following: following,
        createdAt: created_at,
        totalPublicRepos: public_repos + total_private_repos,
        totalMergedPRs: 0,
        avatarUrl: avatar_url,
    }
}
