export enum SHARED_Model__ContributionLevelType {
    NONE = 'NONE',
    FIRST_QUARTILE = 'FIRST_QUARTILE',
    SECOND_QUARTILE = 'SECOND_QUARTILE',
    THIRD_QUARTILE = 'THIRD_QUARTILE',
    FOURTH_QUARTILE = 'FOURTH_QUARTILE',
}

// TODO: rename fields to be more readable on client (ex totalRepositoryContributions -> totalRepositoriesCreated)
export interface SHARED_Model__ContributionsAggregate {
    restrictedContributionsCount: number
    totalCommitContributions: number
    totalIssueContributions: number
    totalPullRequestContributions: number
    totalPullRequestReviewContributions: number
    totalRepositoriesWithContributedCommits: number
    totalRepositoryContributions: number
    totalContributions: number
    startedAt: string
    endedAt: string
}

export interface SHARED_Model__ContributionCalendarDay {
    color: string
    contributionCount: number
    contributionLevel: SHARED_Model__ContributionLevelType
    date: string
    weekday: number
}

export interface SHARED_Model__ContributionCalendarWeek {
    contributionDays: SHARED_Model__ContributionCalendarDay[]
}

export interface SHARED_Model__CommitContributionsByRepo {
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

// TODO: clean up GQL raw responses
export interface SHARED_Model__ContributionsCollection extends SHARED_Model__ContributionsAggregate {
    contributionCalendar: {
        isHalloween: boolean
        weeks: SHARED_Model__ContributionCalendarWeek[]
    }
    commitContributionsByRepository: SHARED_Model__CommitContributionsByRepo[]
}

export interface SHARED_Model__DailyContributionsInfo {
    avgDailyContributions: number
    contributionsByWeekday: number[] // weekday (idx) -> total contributionsCount on that weekday
    mostActiveDay: {
        maxContributions: number
        maxDate: string
    }
}

export interface SHARED_Model__MonthlyContributionsInfo {
    avgMonthlyContributions: number
    contributionsByMonthAndYear: { monthAndYear: string; contributionCount: number }[]
    contributionsByMonth: { month: string; contributionCount: number }[]
}

export interface SHARED_Model__ContributionsClientInfo {
    contributions: SHARED_Model__ContributionsCollection
    calendarGrid: (SHARED_Model__ContributionCalendarDay | null)[][]
    dailyInfo: SHARED_Model__DailyContributionsInfo
    monthlyInfo: SHARED_Model__MonthlyContributionsInfo
    longestContributionStreak: number
    longestContributionDrySpell: number
    accountCreatedDate: string
}
