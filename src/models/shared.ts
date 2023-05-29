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
