/*

======== CONVENTIONS ========

- `SHARED_APIFields` extends `SHARED_APIFields__BASE`, used in client-server interactions (i.e. bridge from /api/routes to client)
- `SHARED_Data` is truncated version of server data (such as `GH_API_Obj` or `GH_GQL_Schema`)
- `SHARED_Model` is completely custom-defined
*/

export interface SHARED_APIFields__BASE {
    success: boolean
    error?: string
}

/* ======== OAuth ======== */

export interface SHARED_APIFields__GetToken extends SHARED_APIFields__BASE {
    accessToken?: string
}

export type SHARED_APIFields__ValidateToken = SHARED_APIFields__BASE

/* ======== user ======== */

export interface SHARED_Data__UserCardData {
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

export interface SHARED_APIFields__GetUserCard extends SHARED_APIFields__BASE {
    userCard?: SHARED_Data__UserCardData
}

/* ======== commits ======== */

export interface SHARED_Data__Commit {
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

export interface SHARED_Data__CommitWithDiff extends SHARED_Data__Commit {
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

export interface SHARED_APIFields__ListCommits extends SHARED_APIFields__BASE {
    commits?: SHARED_Data__Commit[]
}

export interface SHARED_APIFields__ListCommitWithDiff extends SHARED_APIFields__BASE {
    commit?: SHARED_Data__CommitWithDiff
}

export interface SHARED_APIFields__CountCommitsResponse extends SHARED_APIFields__BASE {
    numCommits?: number
}

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

export interface SHARED_Model__RepoWithCountCommits {
    name: string
    owner: {
        login: string
    }
    totalCount: number
}

export interface SHARED_Model__RepoCommitCountStats {
    numRepos: number
    numCommits: number
}

export interface SHARED_APIFields__ReposWithCountCommitsAndTotalStats extends SHARED_APIFields__BASE {
    repos?: SHARED_Model__RepoWithCountCommits[]
    stats?: SHARED_Model__RepoCommitCountStats
}

/* ======== metrics ======== */

export interface SHARED_Data__WeeklyContributionActivityData {
    w: number
    a: number
    d: number
    c: number
}

export interface SHARED_Data__ContributorActivity {
    author: {
        login: string
    }
    total: number
    weeks: SHARED_Data__WeeklyContributionActivityData[]
}

export interface SHARED_APIFields__GetContributorActivity extends SHARED_APIFields__BASE {
    activity?: SHARED_Data__ContributorActivity
}

/* ======== aggregate ======== */

export const makeLifeTimeStats = (): SHARED_Model__LifetimeStats => {
    return {
        numRepos: 0,
        numCommits: 0,
        numAdditions: 0,
        numDeletions: 0,
        numLines: 0,
    }
}

export interface SHARED_Model__LifetimeStats {
    numRepos: number
    numCommits: number
    numLines: number
    numAdditions: number
    numDeletions: number
}

export interface SHARED_APIFields__GetLifetimeStats extends SHARED_APIFields__BASE {
    stats?: SHARED_Model__LifetimeStats
}

/* ======== lines of code ======== */
