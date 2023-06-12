import { SHARED_APIFields__BASE } from './models/apiFields'

/*

======== CONVENTIONS ========

- `SHARED_APIFields` extends `SHARED_APIFields__BASE`, used in client-server interactions (i.e. bridge from /api/routes to client)
- `SHARED_Data` is truncated version of server data (such as `GH_API_Obj` or `GH_GQL_Schema`)
- `SHARED_Model` is completely custom-defined
*/

/* ======== repos ======== */

export interface SHARED_Data__Repo {
    id: number
    node_id: string
    name: string
    full_name: string
    owner: {
        login: string
        type: string
    }
    private: boolean
    description: string
    fork: boolean
    url: string
    homepage: string
    forks_count: number
    stargazers_count: number
    watchers_count: number
    size: number
    default_branch: string
    open_issues_count: number
    topics: string[]
    archived: boolean
    disabled: boolean
    visibility: string
    pushed_at: string
    created_at: string
    updated_at: string
    permissions: {
        admin: boolean
        push: boolean
        pull: boolean
    }
    license: {
        key: string
        name: string
    }
    forks: number
    open_issues: number
    watchers: number
}

export interface SHARED_APIFields__ListRepos extends SHARED_APIFields__BASE {
    repos?: SHARED_Data__Repo[]
}

export interface SHARED_APIFields__CountRepos extends SHARED_APIFields__BASE {
    numRepos?: number
}

export interface SHARED_Model__RepoWithCommitCounts {
    name: string
    owner: {
        login: string
    }
    diskUsage: number
    totalCount: number
}

export interface SHARED_Model__RepoWithCommitCountsAndLineInfo extends SHARED_Model__RepoWithCommitCounts {
    lineInfo: SHARED_Model__LinesStats
}

export interface SHARED_Model__RepoWithCommitCountsAndLanguages extends SHARED_Model__RepoWithCommitCounts {
    totalCount: number
    languageData: {
        size: number
        color: string
        name: string
    }[]
}

export type SHARED_Model__RepoWithCommitCountsAndLanguagesAndLineInfo = SHARED_Model__RepoWithCommitCountsAndLineInfo &
    SHARED_Model__RepoWithCommitCountsAndLanguages

export interface SHARED_Model__RepoCommitCountStats {
    numRepos: number
    numCommits: number
}

export interface SHARED_APIFields__ReposWithCountCommitsAndTotalStats extends SHARED_APIFields__BASE {
    repos?: SHARED_Model__RepoWithCommitCounts[]
    rc_stats?: SHARED_Model__RepoCommitCountStats
}

/* ======== metrics ======== */

export interface SHARED_Data__WeeklyContributionCommitActivityData {
    w: number
    a: number
    d: number
    c: number
}

export interface SHARED_Data__ContributorCommitActivity {
    author: {
        login: string
    }
    total: number
    weeks: SHARED_Data__WeeklyContributionCommitActivityData[]
}

export interface SHARED_APIFields__GetContributorCommitActivity extends SHARED_APIFields__BASE {
    activity?: SHARED_Data__ContributorCommitActivity
}

/* ======== languages ======== */

export interface SHARED_Model__AllLanguageStats {
    totalDiskUsage: number
    allLanguageData: {
        size: number
        color: string
        name: string
    }[]
}

/* ======== aggregate ======== */

export const makeLinesStats = (): SHARED_Model__LinesStats => {
    return {
        numAdditions: 0,
        numDeletions: 0,
        numLines: 0,
    }
}

export interface SHARED_Model__LinesStats {
    numLines: number
    numAdditions?: number
    numDeletions?: number
}

export interface SHARED_APIFields__LinesStats extends SHARED_APIFields__BASE {
    lines_stats: SHARED_Model__LinesStats
}

export interface SHARED_Model__LifetimeStats {
    language_stats: SHARED_Model__AllLanguageStats
    repos: SHARED_Model__RepoWithCommitCountsAndLanguages[]
    rc_stats: SHARED_Model__RepoCommitCountStats
}

export interface SHARED_APIFields__LifetimeStats extends SHARED_APIFields__BASE {
    lifetimeStats?: SHARED_Model__LifetimeStats
}

/* ======== lines of code ======== */
