export interface GH_GQL_User {
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
