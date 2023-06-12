export interface SHARED_Model__WeeklyContributionCommitActivityData {
    w: number
    a: number
    d: number
    c: number
}

export interface SHARED_Model__ContributorCommitActivity {
    author: {
        login: string
    }
    total: number
    weeks: SHARED_Model__WeeklyContributionCommitActivityData[]
}
