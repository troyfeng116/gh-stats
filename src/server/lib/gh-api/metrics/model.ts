// https://docs.github.com/en/rest/metrics/statistics?apiVersion=2022-11-28#get-all-contributor-commit-activity
export interface GH_API_ContributorActivity {
    author: {
        login: string
        id: number
        node_id: string
        avatar_url: string
        gravatar_id: string
        url: string
        html_url: string
        followers_url: string
        following_url: string
        gists_url: string
        starred_url: string
        subscriptions_url: string
        organizations_url: string
        repos_url: string
        events_url: string
        received_events_url: string
        type: string
        site_admin: boolean
    }
    total: number
    weeks: {
        w: number
        a: number
        d: number
        c: number
    }[]
}

export type GH_API_AllContributorActivity = GH_API_ContributorActivity[]
