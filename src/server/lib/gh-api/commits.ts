import { getGitHubAPI } from '.'

import { objToQueryParamsString } from '@/server/utils/objToQueryParams'

// https://docs.github.com/en/rest/commits/commits?apiVersion=2022-11-28#list-commits
export interface GH_API_Commit {
    url: string
    sha: string
    node_id: string
    html_url: string
    comments_url: string
    commit: {
        url: string
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
        comment_count: number
        verification: {
            verified: boolean
            reason: string
            signature: string
            payload: string
        }
    }
    author: {
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
    }
    committer: {
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
    }
    parents: [
        {
            url: string
            sha: string
        },
    ]
}

export interface GH_API_listCommitsQueryParams {
    sha?: string
    path?: string
    author?: string
    since?: string // ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ
    until?: string
    per_page?: number
    page?: number
}

// https://docs.github.com/en/rest/commits/commits?apiVersion=2022-11-28#list-commits
export const GH_API_listCommits = async (
    accessToken: string,
    owner: string,
    repo: string,
    params?: GH_API_listCommitsQueryParams,
): Promise<{ success: boolean; error?: string; commits?: GH_API_Commit[] }> => {
    let url = `/repos/${owner}/${repo}/commits`
    if (params !== undefined) {
        url = `${url}?${objToQueryParamsString(params)}`
    }

    console.log(url)
    const res = await getGitHubAPI(url, accessToken)
    // console.log(res)

    const { status, statusText } = res
    if (status !== 200) {
        return {
            commits: undefined,
            success: false,
            error: `error ${status}: ${statusText}`,
        }
    }

    const resJson = (await res.json()) as GH_API_Commit[]
    // console.log(resJson)

    return {
        commits: resJson,
        success: true,
    }
}
