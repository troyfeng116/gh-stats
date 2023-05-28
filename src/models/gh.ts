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

// https://docs.github.com/en/apps/oauth-apps/maintaining-oauth-apps/troubleshooting-oauth-app-access-token-request-errors#bad-verification-code
export interface GH_OAuthAccessTokenAPIError {
    error: string
    error_description: string
    error_uri: string
}

export type GH_OAuthAccessTokenAPIResponse = Partial<GH_OAuthAccessTokenAPISuccess> &
    Partial<GH_OAuthAccessTokenAPIError>
