/*

======== CONVENTIONS ========

- `SHARED_APIFields` extends `SHARED_APIFields_BASE`, used in client-server interactions (i.e. bridge from /api/routes to client)
- `SHARED_Data` is truncated version of server data (such as `GH_API_Obj` or `GH_GQL_Schema`)
- `SHARED_Model` is completely custom-defined
*/

export interface SHARED_APIFields_BASE {
    success: boolean
    error?: string
}

/* ======== OAuth ======== */

export interface SHARED_APIFields_GetToken extends SHARED_APIFields_BASE {
    accessToken?: string
}

export type SHARED_APIFields_ValidateToken = SHARED_APIFields_BASE

/* ======== user ======== */

export interface SHARED_Data_UserCardData {
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

export interface SHARED_APIFields_GetUserCard extends SHARED_APIFields_BASE {
    userCard?: SHARED_Data_UserCardData
}

/* ======== commits ======== */

export interface SHARED_Data_Commit {
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

export interface SHARED_Data_CommitWithDiff extends SHARED_Data_Commit {
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

export interface SHARED_APIFields_ListCommits extends SHARED_APIFields_BASE {
    commits?: SHARED_Data_Commit[]
}

export interface SHARED_APIFields_ListCommitWithDiff extends SHARED_APIFields_BASE {
    commit?: SHARED_Data_CommitWithDiff
}

export interface SHARED_APIFields_CountCommitsResponse extends SHARED_APIFields_BASE {
    numCommits?: number
}

/* ======== repos ======== */

export interface SHARED_Data_Repo {
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

export interface SHARED_APIFields_ListRepos extends SHARED_APIFields_BASE {
    repos?: SHARED_Data_Repo[]
}

export interface SHARED_APIFields_CountRepos extends SHARED_APIFields_BASE {
    numRepos?: number
}

/* ======== metrics ======== */

export interface SHARED_Data_WeeklyContributionActivityData {
    w: number
    a: number
    d: number
    c: number
}

export interface SHARED_Data_ContributorActivity {
    author: {
        login: string
    }
    total: number
    weeks: SHARED_Data_WeeklyContributionActivityData[]
}

export interface SHARED_APIFields_GetContributorActivity extends SHARED_APIFields_BASE {
    activity?: SHARED_Data_ContributorActivity
}

/* ======== aggregate ======== */

export const makeLifeTimeStats = (): SHARED_Model_LifetimeStats => {
    return {
        numRepos: 0,
        numCommits: 0,
        numAdditions: 0,
        numDeletions: 0,
        numLines: 0,
    }
}

export interface SHARED_Model_LifetimeStats {
    numRepos: number
    numCommits: number
    numLines: number
    numAdditions: number
    numDeletions: number
}

export interface SHARED_APIFields_GetLifetimeStats extends SHARED_APIFields_BASE {
    stats?: SHARED_Model_LifetimeStats
}

/* ======== lines of code ======== */
