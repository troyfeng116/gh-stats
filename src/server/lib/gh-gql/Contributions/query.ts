import { GH_GQL_Schema__ContributionsAggregate } from '../ContributionsAggregate/query'

import { SHARED_Model__ContributionLevelType } from '@/shared/models/models/Contributions'

export const GH_GQL_Query__Contributions = `query Contributions($first: Int = 100, $from: DateTime, $to: DateTime) {
    viewer {
        contributionsCollection(from: $from, to: $to) {
            ...ContributionsCollection
        }
    }
}

fragment ContributionsCollection on ContributionsCollection {
    totalCommitContributions
    totalIssueContributions
    totalPullRequestContributions
    totalPullRequestReviewContributions
    totalRepositoryContributions
    startedAt
    contributionCalendar {
        colors
        isHalloween
        months {
            year
            name
            totalWeeks
            firstDay
        }
        totalContributions
        weeks {
            contributionDays {
                color
                contributionCount
                contributionLevel
                date
                weekday
            }
        }
    }
    commitContributionsByRepository {
        repository {
            name
            owner {
                id
                login
            }
        }
        contributions(first: $first) {
            totalCount
            pageInfo {
                hasNextPage
                endCursor
            }
            nodes {
                occurredAt
                commitCount
            }
        }
    }
}
`

export interface GH_GQL_QueryVars__Contributions {
    first?: number
    from?: string // ISO-8601 encoded UTC date string
    to?: string // ISO-8601 encoded UTC date string
}

export interface GH_GQL_Schema__ContributionCalendarMonth {
    year: number
    name: string
    totalWeeks: number
    firstDay: string
}

export interface GH_GQL_Schema__ContributionCalendarWeek {
    contributionDays: GH_GQL_Schema__ContributionCalendarDay[]
}

export interface GH_GQL_Schema__ContributionCalendarDay {
    color: string
    contributionCount: number
    // TODO: should this be in shared
    contributionLevel: SHARED_Model__ContributionLevelType
    date: string
    weekday: number
}

export interface GH_GQL_Schema__CommitContributionsByRepository {
    repository: {
        name: string
        owner: {
            id: string
            login: string
        }
    }
    contributions: {
        totalCount: number
        pageInfo: {
            hasNextPage: boolean
            endCursor: string
        }
        nodes: {
            occurredAt: string
            commitCount: number
        }[]
    }
}

export interface GH_GQL_Schema__ContributionsCollection extends GH_GQL_Schema__ContributionsAggregate {
    contributionCalendar: {
        colors: string[]
        isHalloween: boolean
        months: GH_GQL_Schema__ContributionCalendarMonth[]
        totalContributions: number
        weeks: GH_GQL_Schema__ContributionCalendarWeek[]
    }
    commitContributionsByRepository: GH_GQL_Schema__CommitContributionsByRepository[]
}
