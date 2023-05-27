/*
Interfaces for GitHub API responses.
*/

export interface GH_OAuthAccessTokenAPISuccess {
    access_token: string
    expires_in: number
    refresh_token: string
    refresh_token_expires_in: number
    token_type: string
    scope: string
}

export interface GH_OAuthAccessTokenAPIError {
    error: string
    error_description: string
    error_uri: string
}
