import { BASE_GH_API_Call__getWithAuth, GH_API_Response__BASE } from '..'

import { GH_API_Obj__Repo } from './model'

import { extractNumCommitsFromHeaders } from '@/server/utils/extractNumCommits'
import { getURLWithQueryParams } from '@/server/utils/objToQueryParams'

export interface GH_API_Obj__listAuthUserReposQueryParams {
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

export interface GH_API_Response__listRepos extends GH_API_Response__BASE {
    repos?: GH_API_Obj__Repo[]
}

// https://docs.github.com/en/rest/repos/repos?apiVersion=2022-11-28#list-repositories-for-the-authenticated-user
export const GH_API_Call__listRepos = async (
    accessToken: string,
    params?: GH_API_Obj__listAuthUserReposQueryParams,
): Promise<GH_API_Response__listRepos> => {
    const url = getURLWithQueryParams('/user/repos', params)

    const res = await BASE_GH_API_Call__getWithAuth(url, accessToken)
    const { status, statusText } = res
    if (status !== 200) {
        return { repos: undefined, success: false, error: `error ${status}: ${statusText}` }
    }

    const resJson: GH_API_Obj__Repo[] = (await res.json()) as GH_API_Obj__Repo[]
    // console.log(resJson)

    return {
        repos: resJson,
        success: true,
    }
}

export interface GH_API_Response__countRepos extends GH_API_Response__BASE {
    numRepos?: number
}

// TODO: source?
export const GH_API_Call__countRepos = async (
    accessToken: string,
    params?: Omit<GH_API_Obj__listAuthUserReposQueryParams, 'per_page'>,
): Promise<GH_API_Response__countRepos> => {
    const fullParams: GH_API_Obj__listAuthUserReposQueryParams = {
        ...params,
        per_page: 1,
    }
    const url = getURLWithQueryParams('/user/repos', fullParams)

    const res = await BASE_GH_API_Call__getWithAuth(url, accessToken)
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
