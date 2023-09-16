import { SHARED_Model__LinesStats } from './Stats'

export interface SHARED_Model__Repo {
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
        approxLoc: number
    }[]
}

export type SHARED_Model__RepoWithCommitCountsAndLanguagesAndLineInfo = SHARED_Model__RepoWithCommitCountsAndLineInfo &
    SHARED_Model__RepoWithCommitCountsAndLanguages
