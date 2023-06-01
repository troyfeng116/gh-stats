// https://docs.github.com/en/rest/commits/commits?apiVersion=2022-11-28#list-commits
export interface GH_API_Obj__Commit {
    url: string
    sha: string
    node_id: string
    html_url: string
    comments_url: string
    commit: {
        url: string
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
        comment_count: number
        verification: {
            verified: boolean
            reason: string
            signature: string | null
            payload: string | null
        }
    }
    author: {
        login: string
        id: number
        node_id: string
        avatar_url: string
        gravatar_id: string
        url: string
        html_url: string
        followers_url: string
        following_url: string
        gists_url: string
        starred_url: string
        subscriptions_url: string
        organizations_url: string
        repos_url: string
        events_url: string
        received_events_url: string
        type: string
        site_admin: boolean
    }
    committer: {
        login: string
        id: number
        node_id: string
        avatar_url: string
        gravatar_id: string
        url: string
        html_url: string
        followers_url: string
        following_url: string
        gists_url: string
        starred_url: string
        subscriptions_url: string
        organizations_url: string
        repos_url: string
        events_url: string
        received_events_url: string
        type: string
        site_admin: boolean
    }
    parents: [
        {
            url: string
            sha: string
        },
    ]
}

// https://docs.github.com/en/rest/commits/commits?apiVersion=2022-11-28#get-a-commit
export interface GH_API_Obj__CommitWithDiff extends GH_API_Obj__Commit {
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
        raw_url: string
        blob_url: string
        patch: string
    }[]
}
