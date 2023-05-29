import { getGitHubAPI } from '@/server/utils/makeCallToGitHubAPI'

// https://docs.github.com/en/rest/users/users?apiVersion=2022-11-28#get-the-authenticated-user
export interface GH_GetAuthUserAPI {
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
    two_factor_authentication: boolean
    plan: {
        name: string
        space: number
        private_repos: number
        collaborators: number
    }
}

export const GH_getUserAPI = async (
    accessToken: string,
): Promise<{ res: GH_GetAuthUserAPI | undefined; success: boolean; error?: string }> => {
    const res = await getGitHubAPI('/user', accessToken)

    const { status, statusText } = res
    if (status !== 200 && status !== 304) {
        return {
            res: undefined,
            success: false,
            error: `error ${status}: ${statusText}`,
        }
    }

    const resJson = (await res.json()) as GH_GetAuthUserAPI
    console.log(resJson)

    return {
        res: resJson,
        success: true,
    }
}
