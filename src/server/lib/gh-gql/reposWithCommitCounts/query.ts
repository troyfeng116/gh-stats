export interface GH_GQL_GetReposWithCommitCountsVariables {
    author: {
        id: string
    }
    includeRepos: boolean
    includeReposContributed: boolean
    first?: number
    reposAfter?: string
    reposContributedAfter?: string
}

export const GH_GQL_GET_REPOS_WITH_COMMIT_COUNTS_QUERY = `query GetReposAndCommits(
  $author: CommitAuthor!,
  $includeRepos: Boolean!,
  $includeReposContributed: Boolean!,
  $first: Int = 100,
  $reposAfter: String,
  $reposContributedAfter: String,
) {
  viewer {
    repositories(first: $first, after: $reposAfter) @include(if: $includeRepos) {
      ...repoCommitCounts
    }
    repositoriesContributedTo(first: $first, after: $reposContributedAfter) @include(if: $includeReposContributed) {
      ...repoCommitCounts
    }
  }
}

fragment repoCommitCounts on RepositoryConnection {
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
