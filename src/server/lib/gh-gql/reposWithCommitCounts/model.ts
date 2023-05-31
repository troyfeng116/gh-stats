import { GH_GQL_BaseResponse } from '..'

export interface GH_GQL_RepoWithCommitCountsSchema {
    id: string
    name: string
    owner: {
        login: string
    }
    defaultBranchRef: {
        target: {
            history: {
                totalCount: number
            }
        }
    }
}

export interface GH_GQL_RepoConnection {
    totalCount: number
    pageInfo: {
        hasPreviousPage: boolean
        hasNextPage: boolean
        startCursor: string
        endCursor: string
    }
    nodes: GH_GQL_RepoWithCommitCountsSchema[]
}

export interface GH_GQL_GetReposWithCommitCountsResponse extends GH_GQL_BaseResponse {
    data?: {
        repositories?: GH_GQL_RepoConnection
        repositoriesContributedTo?: GH_GQL_RepoConnection
    }
}
