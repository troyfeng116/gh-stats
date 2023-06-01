import { BASE_GH_API_Call__getWithAuth, GH_API_Response__BASE } from '..'

import { GH_API_Obj__Commit, GH_API_Obj__CommitWithDiff } from './model'

import { extractNumCommitsFromHeaders } from '@/server/utils/extractNumCommits'
import { getURLWithQueryParams } from '@/server/utils/objToQueryParams'

export interface GH_API_Params__listCommits {
    sha?: string
    path?: string
    author?: string
    since?: string // ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ
    until?: string
    per_page?: number
    page?: number
}

export interface GH_API_Response__listCommits extends GH_API_Response__BASE {
    commits?: GH_API_Obj__Commit[]
}

// https://docs.github.com/en/rest/commits/commits?apiVersion=2022-11-28#list-commits
export const GH_API_Call__listCommits = async (
    accessToken: string,
    owner: string,
    repo: string,
    params?: GH_API_Params__listCommits,
): Promise<GH_API_Response__listCommits> => {
    const url = getURLWithQueryParams(`/repos/${owner}/${repo}/commits`, params)

    // console.log(url)
    const res = await BASE_GH_API_Call__getWithAuth(url, accessToken)
    // console.log(res)

    const { status, statusText } = res
    if (status !== 200) {
        return {
            commits: undefined,
            success: false,
            error: `error ${status}: ${statusText}`,
        }
    }

    const resJson = (await res.json()) as GH_API_Obj__Commit[]
    // console.log(resJson)

    return {
        commits: resJson,
        success: true,
    }
}

export interface GH_API_Response__countCommits extends GH_API_Response__BASE {
    numCommits?: number
}

// TODO: need additional non-abstracted function here to access res.headers
// https://gist.github.com/0penBrain/7be59a48aba778c955d992aa69e524c5
export const GH_API_Call__countCommits = async (
    accessToken: string,
    owner: string,
    repo: string,
    params?: Omit<GH_API_Params__listCommits, 'per_page'>,
): Promise<GH_API_Response__countCommits> => {
    const fullParams: GH_API_Params__listCommits = {
        ...params,
        per_page: 1,
    }
    const url = getURLWithQueryParams(`/repos/${owner}/${repo}/commits`, fullParams)

    // console.log(url)
    const res = await BASE_GH_API_Call__getWithAuth(url, accessToken)
    // console.log(await res.json())

    const { status, statusText, headers } = res
    if (status !== 200) {
        return {
            numCommits: undefined,
            success: false,
            error: `error ${status}: ${statusText}`,
        }
    }

    // console.log(headers)
    const numCommits = extractNumCommitsFromHeaders(headers)

    return {
        numCommits: numCommits,
        success: true,
    }
}

// if >300 files changed in diff, paginates up to 3000 files
export interface GH_API_Params__getCommit {
    per_page?: number
    page?: number
}

export interface GH_API_Response__getCommit extends GH_API_Response__BASE {
    commit?: GH_API_Obj__CommitWithDiff
}

// https://docs.github.com/en/rest/commits/commits?apiVersion=2022-11-28#get-a-commit
export const GH_API_Call__getCommit = async (
    accessToken: string,
    owner: string,
    repo: string,
    ref: string,
    params?: GH_API_Params__getCommit,
): Promise<GH_API_Response__getCommit> => {
    const url = getURLWithQueryParams(`/repos/${owner}/${repo}/commits/${ref}`, params)

    const res = await BASE_GH_API_Call__getWithAuth(url, accessToken)

    const { status, statusText } = res
    if (status !== 200) {
        return {
            commit: undefined,
            success: false,
            error: `error ${status}: ${statusText}`,
        }
    }

    const resJson = (await res.json()) as GH_API_Obj__CommitWithDiff
    // console.log(resJson)

    return {
        commit: resJson,
        success: true,
    }
}
