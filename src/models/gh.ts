/*
Interfaces for raw GitHub API responses.
*/

// https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps#2-users-are-redirected-back-to-your-site-by-github
export interface GH_OAuthAccessTokenAPISuccess {
    access_token: string
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
