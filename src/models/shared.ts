/*
Shared interfaces for client-server interactions
*/

export interface BaseAPIResponse {
    success: boolean
    error?: string
}

export interface GetTokenAPIResponse extends BaseAPIResponse {
    accessToken?: string
}

export type ValidateTokenAPIResponse = BaseAPIResponse

export interface UserCardData {
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
export interface GetUserCardAPIResponse extends BaseAPIResponse {
    userCard?: UserCardData
}
