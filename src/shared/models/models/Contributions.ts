import {
    GH_GQL_Schema__CommitContributionsByRepository,
    GH_GQL_Schema__ContributionCalendarWeek,
} from '@/server/lib/gh-gql/Contributions/query'

// TODO: clean up GQL raw responses
export interface SHARED_Model__Contributions {
    contributionYears: number[]
    contributionCalendar: {
        isHalloween: boolean
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
