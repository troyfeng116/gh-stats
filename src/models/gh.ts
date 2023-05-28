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

export interface GH_UserAPI {
    login: string
    id: number
    node_id: string
    avatar_url: string
    gravatar_id: string
    url: string
    html_url: string
    //   "followers_url": "https://api.github.com/users/octocat/followers",
    //   "following_url": "https://api.github.com/users/octocat/following{/other_user}",
    //   "gists_url": "https://api.github.com/users/octocat/gists{/gist_id}",
    //   "starred_url": "https://api.github.com/users/octocat/starred{/owner}{/repo}",
    //   "subscriptions_url": "https://api.github.com/users/octocat/subscriptions",
    //   "organizations_url": "https://api.github.com/users/octocat/orgs",
    //   "repos_url": "https://api.github.com/users/octocat/repos",
    //   "events_url": "https://api.github.com/users/octocat/events{/privacy}",
    //   "received_events_url": "https://api.github.com/users/octocat/received_events",
    type: string
    site_admin: false
    name: string
    company: string
    blog: string
    location: string
    email: string
    hireable: false
    bio: string
    twitter_username: string
    public_repos: number
    public_gists: 1
    followers: number
    following: number
    created_at: string
    updated_at: string
    private_gists: number
    total_private_repos: number
    owned_private_repos: number
    disk_usage: number
    collaborators: number
    //   "two_factor_authentication": true,
    //   "plan": {
    //     "name": "Medium",
    //     "space": 400,
    //     "private_repos": 20,
    //     "collaborators": 0
    //   }
}
