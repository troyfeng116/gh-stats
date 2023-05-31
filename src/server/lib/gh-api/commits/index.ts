import { getGitHubAPI } from '..'

import { GH_API_Commit, GH_API_CommitWithDiff } from './model'

import { extractNumCommitsFromHeaders } from '@/server/utils/extractNumCommits'
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

    // console.log(url)
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

// TODO: need additional non-abstracted function here to access res.headers
// https://gist.github.com/0penBrain/7be59a48aba778c955d992aa69e524c5
export const GH_API_countCommits = async (
    accessToken: string,
    owner: string,
    repo: string,
    params?: Omit<GH_API_listCommitsQueryParams, 'per_page'>,
): Promise<{ success: boolean; error?: string; numCommits?: number }> => {
    const fullParams: GH_API_listCommitsQueryParams = {
        ...params,
        per_page: 1,
    }
    const url = getURLWithQueryParams(`/repos/${owner}/${repo}/commits`, fullParams)

    // console.log(url)
    const res = await getGitHubAPI(url, accessToken)
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
export interface GH_API_getCommitQueryParams {
    per_page?: number
    page?: number
}

// https://docs.github.com/en/rest/commits/commits?apiVersion=2022-11-28#get-a-commit
export const GH_API_getCommit = async (
    accessToken: string,
    owner: string,
    repo: string,
    ref: string,
    params?: GH_API_getCommitQueryParams,
): Promise<{ success: boolean; error?: string; commit?: GH_API_CommitWithDiff }> => {
    const url = getURLWithQueryParams(`/repos/${owner}/${repo}/commits/${ref}`, params)

    const res = await getGitHubAPI(url, accessToken)

    const { status, statusText } = res
    if (status !== 200) {
        return {
            commit: undefined,
            success: false,
            error: `error ${status}: ${statusText}`,
        }
    }

    const resJson = (await res.json()) as GH_API_CommitWithDiff
    // console.log(resJson)

    return {
        commit: resJson,
        success: true,
    }
}
