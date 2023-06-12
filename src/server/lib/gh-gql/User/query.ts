export const GH_GQL_Query__User = `query User($login: String!) {
    user(login: $login) {
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
    }
}
`

export interface GH_GQL_Schema__User {
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

export interface GH_GQL_QueryVars__getUser {
    login: string
}
