import { getGitHubAPI } from '..'

import { GH_API_Commit } from './model'

import { getURLWithQueryParams } from '@/server/utils/objToQueryParams'

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
    const url = getURLWithQueryParams(`/repos/${owner}/${repo}/commits`, params)

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
