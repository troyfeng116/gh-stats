export interface GH_GQL_Schema__RepoWithCommitCounts {
    id: string
    name: string
    owner: {
        login: string
    }
    defaultBranchRef: {
        target: {
            history: {
                totalCount: number
            }
        }
    }
}

export interface GH_GQL_Schema__RepoConnection {
    totalCount: number
    pageInfo: {
        hasPreviousPage: boolean
        hasNextPage: boolean
        startCursor: string
        endCursor: string
    }
    nodes: GH_GQL_Schema__RepoWithCommitCounts[]
}

export interface GH_GQL_QueryVars__AllRepoCommitCounts {
    author: {
        id: string
    }
    includeRepos: boolean
    includeReposContributed: boolean
    first?: number
    reposAfter?: string
    reposContributedAfter?: string
}

export const GH_GQL_Query__ReposAndCommitCounts = `query AllRepoCommitCounts(
    $author: CommitAuthor!,
    $includeRepos: Boolean!,
    $includeReposContributed: Boolean!,
    $first: Int = 100,
    $reposAfter: String,
    $reposContributedAfter: String,
) {
    viewer {
        repositories(first: $first, after: $reposAfter) @include(if: $includeRepos) {
            ...repoConn
        }
        repositoriesContributedTo(first: $first, after: $reposContributedAfter) @include(if: $includeReposContributed) {
            ...repoConn
        }
    }
}

fragment repoConn on RepositoryConnection {
    totalCount
    pageInfo {
        hasPreviousPage
        hasNextPage
        startCursor
        endCursor
    }
    nodes {
        id
        name
        owner {
            login
        }
        defaultBranchRef {
            target {
                ... on Commit {
                    history(author: $author) {
                        totalCount
                    }
                }
            }
        }
    }
}`
