import { SHARED_Model__ContributionLevelType } from '@/shared/models/models/Contributions'

export const GH_GQL_Query__Contributions = `query Contributions($first: Int = 100) {
    viewer {
        contributionsCollection {
            ...ContributionsCollection
        }
    }
}

fragment ContributionsCollection on ContributionsCollection {
    contributionYears
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
    totalPullRequestContributions
    totalCommitContributions
    totalRepositoriesWithContributedCommits
    totalRepositoryContributions
    startedAt
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
    after?: string
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

export interface GH_GQL_Schema__ContributionsCollection {
    contributionYears: number[]
    contributionCalendar: {
        colors: string[]
        isHalloween: boolean
        months: GH_GQL_Schema__ContributionCalendarMonth[]
        totalContributions: number
        weeks: GH_GQL_Schema__ContributionCalendarWeek[]
    }
    totalPullRequestContributions: number
    totalCommitContributions: number
    totalRepositoriesWithContributedCommits: number
    totalRepositoryContributions: number
    startedAt: number
    commitContributionsByRepository: GH_GQL_Schema__CommitContributionsByRepository[]
}
