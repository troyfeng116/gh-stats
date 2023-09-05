export enum SHARED_Model__ContributionLevelType {
    NONE = 'NONE',
    FIRST_QUARTILE = 'FIRST_QUARTILE',
    SECOND_QUARTILE = 'SECOND_QUARTILE',
    THIRD_QUARTILE = 'THIRD_QUARTILE',
    FOURTH_QUARTILE = 'FOURTH_QUARTILE',
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
export interface SHARED_Model__Contributions {
    contributionYears: number[]
    contributionCalendar: {
        isHalloween: boolean
        totalContributions: number
        weeks: SHARED_Model__ContributionCalendarWeek[]
    }
    totalPullRequestContributions: number
    totalCommitContributions: number
    totalRepositoriesWithContributedCommits: number
    totalRepositoryContributions: number
    startedAt: number
    commitContributionsByRepository: SHARED_Model__CommitContributionsByRepo[]
}

export interface SHARED_Model__DailyContributionsInfo {
    avgDailyContributions: number
    contributionsByWeekday: number[] // weekday (idx) -> total contributionsCount on that weekday
}

export interface SHARED_Model__MonthlyContributionsInfo {
    avgMonthlyContributions: number
    contributionsByMonth: { [month: string]: number } // month name -> total contributionsCount in that month
}

export interface SHARED_Model__ContributionsClientInfo {
    contributions: SHARED_Model__Contributions
    dailyInfo: SHARED_Model__DailyContributionsInfo
    monthlyInfo: SHARED_Model__MonthlyContributionsInfo
    longestContributionStreak: number
    longestContributionDrySpell: number
}
