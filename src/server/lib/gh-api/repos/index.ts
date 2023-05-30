import { getGitHubAPI } from '..'

import { GH_API_Repo } from './model'

import { extractNumCommitsFromHeaders } from '@/server/utils/extractNumCommits'
import { getURLWithQueryParams } from '@/server/utils/objToQueryParams'

export interface GH_API_listAuthUserReposQueryParams {
    visibility?: string
    affiliation?: string
    type?: string
    sort?: string
    direction?: string
    per_page?: number
    page?: number
    since?: string // ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ
    before?: string // ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ
}

// https://docs.github.com/en/rest/repos/repos?apiVersion=2022-11-28#list-repositories-for-the-authenticated-user
export const GH_API_listRepos = async (
    accessToken: string,
    params?: GH_API_listAuthUserReposQueryParams,
): Promise<{ success: boolean; error?: string; repos?: GH_API_Repo[] }> => {
    const url = getURLWithQueryParams('/user/repos', params)

    const res = await getGitHubAPI(url, accessToken)
    const { status, statusText } = res
    if (status !== 200) {
        return { repos: undefined, success: false, error: `error ${status}: ${statusText}` }
    }

    const resJson: GH_API_Repo[] = (await res.json()) as GH_API_Repo[]
    // console.log(resJson)

    return {
        repos: resJson,
        success: true,
    }
}

// TODO: source?
export const GH_API_countRepos = async (
    accessToken: string,
    params?: Omit<GH_API_listAuthUserReposQueryParams, 'per_page'>,
): Promise<{ success: boolean; error?: string; numRepos?: number }> => {
    const fullParams: GH_API_listAuthUserReposQueryParams = {
        ...params,
        per_page: 1,
    }
    const url = getURLWithQueryParams('/user/repos', fullParams)

    const res = await getGitHubAPI(url, accessToken)
    const { status, statusText, headers } = res
    if (status !== 200) {
        return { numRepos: undefined, success: false, error: `error ${status}: ${statusText}` }
    }

    // console.log(headers)
    const numRepos = extractNumCommitsFromHeaders(headers)

    return {
        numRepos: numRepos,
        success: true,
    }
}
