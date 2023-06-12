export const GH_GQL_Query__Viewer = `query Viewer {
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
    }
}
`

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
}
