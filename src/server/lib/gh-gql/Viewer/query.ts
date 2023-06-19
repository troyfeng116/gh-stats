export const GH_GQL_Query__Viewer = `query Viewer($states: [PullRequestState!] = MERGED) {
    viewer {
        id
        login
        name
        email
        createdAt
        followers {
            totalCount
        }
        following {
            totalCount
        }
        repositories {
            totalCount
        }
        repositoriesContributedTo {
            totalCount
        }
        pullRequests(states: $states) {
            totalCount
        }
    }
}
`

export enum GH_GQL_Schema__PullRequestState {
    OPEN = 'OPEN',
    CLOSED = 'CLOSED',
    MERGED = 'MERGED',
}

export interface GH_GQL_QueryVars__Viewer {
    states?: GH_GQL_Schema__PullRequestState
}

export interface GH_GQL_Schema__Viewer {
    id: string
    login: string
    name: string | null
    email: string | null
    createdAt: string
    followers: {
        totalCount: number
    }
    following: {
        totalCount: number
    }
    repositories: {
        totalCount: number
    }
    repositoriesContributedTo: {
        totalCount: number
    }
    pullRequests: {
        totalCount: number
    }
}
