export const GH_GQL_Query__ContributionsAggregate = `query ContributionsAggregate($from: DateTime, $to: DateTime) {
    viewer {
        contributionsCollection(from: $from, to: $to) {
            ...ContributionsCollectionAggregates
      }
    }
}

fragment ContributionsCollectionAggregates on ContributionsCollection {
    restrictedContributionsCount
    totalCommitContributions
    totalIssueContributions
    totalPullRequestContributions
    totalPullRequestReviewContributions
    totalRepositoriesWithContributedCommits
    totalRepositoryContributions
    startedAt
    endedAt
    contributionCalendar {
        totalContributions
    }
}
`

export interface GH_GQL_QueryVars__ContributionsAggregate {
    from?: string // ISO-8601 encoded UTC date string
    to?: string // ISO-8601 encoded UTC date string
}

export interface GH_GQL_Schema__ContributionsAggregate {
    restrictedContributionsCount: number
    totalCommitContributions: number
    totalIssueContributions: number
    totalPullRequestContributions: number
    totalPullRequestReviewContributions: number
    totalRepositoriesWithContributedCommits: number
    totalRepositoryContributions: number
    startedAt: string
    endedAt: string
    contributionCalendar: {
        totalContributions: number
    }
}
