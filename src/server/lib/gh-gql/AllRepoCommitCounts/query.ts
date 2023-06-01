export interface GH_GQL_Schema__RepoWithCommitCountAndLanguages {
    id: string
    name: string
    diskUsage: number
    languages: {
        totalCount: number
        pageInfo: {
            endCursor: string
            hasNextPage: boolean
        }
        edges: {
            size: number
            node: {
                color: string
                name: string
            }
        }[]
    }
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
    totalDiskUsage: number
    totalCount: number
    pageInfo: {
        hasPreviousPage: boolean
        hasNextPage: boolean
        startCursor: string
        endCursor: string
    }
    nodes: GH_GQL_Schema__RepoWithCommitCountAndLanguages[]
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

fragment repo on Repository {
    id
    name
    diskUsage
    languages(first: 100) {
        totalCount
        pageInfo {
            endCursor
            hasNextPage
        }
        edges {
            size
            node {
                color
                name
            }
        }
    }
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

fragment repoConn on RepositoryConnection {
    totalDiskUsage
    totalCount
    pageInfo {
        hasPreviousPage
        hasNextPage
        startCursor
        endCursor
    }
    nodes {
        ...repo
    }
}
`
