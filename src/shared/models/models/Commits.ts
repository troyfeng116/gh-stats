import { SHARED_APIFields__BASE } from '../apiFields'

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
