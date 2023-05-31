export const GH_GQL_GET_VIEWER_QUERY = `query Viewer {
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
    }
}
`

export interface GH_GQL_getUserQueryVariables {
    login: string
}

export const GH_GQL_GET_USER_QUERY = `query User($login: String!) {
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
