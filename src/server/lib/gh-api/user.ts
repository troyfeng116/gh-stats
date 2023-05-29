import { getGitHubAPI } from '.'

// https://docs.github.com/en/rest/users/users?apiVersion=2022-11-28#get-the-authenticated-user
export interface GH_API_GetAuthUserResponse {
    login: string
    id: number
    node_id: string
    avatar_url: string
    gravatar_id: string
    url: string
    html_url: string
    followers_url: string
    following_url: string
    gists_url: string
    starred_url: string
    subscriptions_url: string
    organizations_url: string
    repos_url: string
    events_url: string
    received_events_url: string
    type: string
    site_admin: boolean
    name: string | null
    company: string | null
    blog: string
    location: string | null
    email: string | null
    hireable: boolean
    bio: string | null
    twitter_username: string | null
    public_repos: number
    public_gists: number
    followers: number
    following: number
    created_at: string
    updated_at: string
    private_gists: number
    total_private_repos: number
    owned_private_repos: number
    disk_usage: number
    collaborators: number
    two_factor_authentication: boolean
    plan: {
        name: string
        space: number
        private_repos: number
        collaborators: number
    }
}

export const GH_API_getUser = async (
    accessToken: string,
): Promise<{ success: boolean; error?: string; user?: GH_API_GetAuthUserResponse }> => {
    const res = await getGitHubAPI('/user', accessToken)

    const { status, statusText } = res
    // TODO: how to handle 304?
    if (status !== 200 && status !== 304) {
        return {
            user: undefined,
            success: false,
            error: `error ${status}: ${statusText}`,
        }
    }

    const resJson = (await res.json()) as GH_API_GetAuthUserResponse
    console.log(resJson)

    return {
        user: resJson,
        success: true,
    }
}
