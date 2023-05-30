/*
Shared interfaces for client-server interactions
*/

export interface SHARED_BaseAPIResponse {
    success: boolean
    error?: string
}

export interface SHARED_GetTokenAPIResponse extends SHARED_BaseAPIResponse {
    accessToken?: string
}

export type SHARED_ValidateTokenAPIResponse = SHARED_BaseAPIResponse

export interface SHARED_UserCardData {
    userId?: string
    name?: string
    email?: string
    followers?: number
    following?: number
    createdAt?: string
    publicRepos?: number
    privateRepos?: number
    totalRepos?: number
}
export interface SHARED_GetUserCardAPIResponse extends SHARED_BaseAPIResponse {
    userCard?: SHARED_UserCardData
}

export interface SHARED_CommitData {
    sha: string
    commit: {
        author: {
            name: string
            email: string
            date: string
        }
        committer: {
            name: string
            email: string
            date: string
        }
        message: string
        tree: {
            url: string
            sha: string
        }
    }
    author: {
        login: string
    }
    committer: {
        login: string
    }
}
export interface SHARED_ListCommitsAPIResponse extends SHARED_BaseAPIResponse {
    commits?: SHARED_CommitData[]
}
