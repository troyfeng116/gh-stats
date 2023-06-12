export interface SHARED_Data__WeeklyContributionCommitActivityData {
    w: number
    a: number
    d: number
    c: number
}

export interface SHARED_Data__ContributorCommitActivity {
    author: {
        login: string
    }
    total: number
    weeks: SHARED_Data__WeeklyContributionCommitActivityData[]
}
