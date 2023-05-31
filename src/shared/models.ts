/*
Shared interfaces for client-server interactions
*/

export interface SHARED_BaseAPIResponse {
    success: boolean
    error?: string
}

/* ======== OAuth ======== */

export interface SHARED_GetTokenAPIResponse extends SHARED_BaseAPIResponse {
    accessToken?: string
}

export type SHARED_ValidateTokenAPIResponse = SHARED_BaseAPIResponse

/* ======== user ======== */

export interface SHARED_UserCardData {
    userId: string
    name: string | undefined
    email: string | undefined
    followers: number
    following: number
    createdAt: string
    publicRepos: number
    privateRepos: number
    totalRepos: number
}

export interface SHARED_GetUserCardAPIResponse extends SHARED_BaseAPIResponse {
    userCard?: SHARED_UserCardData
}

/* ======== commits ======== */

export interface SHARED_CommitData {
    sha: string
    commit: {
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
    }
    author: {
        login: string
    }
    committer: {
        login: string
    }
}

export interface SHARED_CommitWithDiffData extends SHARED_CommitData {
    stats: {
        additions: number
        deletions: number
        total: number
    }
    files: {
        filename: string
        additions: number
        deletions: number
        changes: number
        status: string
        blob_url: string
        patch: string
    }[]
}

export interface SHARED_ListCommitsAPIResponse extends SHARED_BaseAPIResponse {
    commits?: SHARED_CommitData[]
}

export interface SHARED_ListCommitWithDiffAPIResponse extends SHARED_BaseAPIResponse {
    commit?: SHARED_CommitWithDiffData
}

export interface SHARED_CountCommitsResponse extends SHARED_BaseAPIResponse {
    numCommits?: number
}

/* ======== repos ======== */

export interface SHARED_RepoData {
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

export interface SHARED_ListReposAPIResponse extends SHARED_BaseAPIResponse {
    repos?: SHARED_RepoData[]
}

export interface SHARED_CountReposAPIResponse extends SHARED_BaseAPIResponse {
    numRepos?: number
}

/* ======== metrics ======== */

export interface SHARED_ContributorActivityData {
    author: {
        login: string
    }
    total: number
    weeks: {
        w: number
        a: number
        d: number
        c: number
    }[]
}

export interface SHARED_GetContributorActivityResponse extends SHARED_BaseAPIResponse {
    activity?: SHARED_ContributorActivityData
}

/* ======== lines of code ======== */
