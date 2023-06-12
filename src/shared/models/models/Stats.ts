export const makeLinesStats = (): SHARED_Model__LinesStats => {
    return {
        numAdditions: 0,
        numDeletions: 0,
        numLines: 0,
    }
}

export interface SHARED_Model__LinesStats {
    numLines: number
    numAdditions?: number
    numDeletions?: number
}

export interface SHARED_Model__RepoCommitCountStats {
    numRepos: number
    numCommits: number
}
