import { GH_GQL_BaseResponse } from '..'

export interface GH_GQL_UserSchema {
    login: string
    name: string | null
    email: string | null
    createdAt: string
    followers: {
        totalCount: number
    }
    following: {
        totalCount: number
    }
    repositories: {
        totalCount: number
    }
    repositoriesContributedTo: {
        totalCount: number
    }
}

export interface GH_GQL_GetUserResponse extends GH_GQL_BaseResponse {
    data?: {
        user: GH_GQL_UserSchema
    }
}

export interface GH_GQL_GetViewerResponse extends GH_GQL_BaseResponse {
    data?: {
        viewer: GH_GQL_UserSchema
    }
}
