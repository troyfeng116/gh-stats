import { SHARED_Model__AllLanguageStats } from './Language'
import { SHARED_Model__RepoWithCommitCountsAndLanguages } from './Repos'

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

export interface SHARED_Model__LifetimeStats {
    language_stats: SHARED_Model__AllLanguageStats
    repos: SHARED_Model__RepoWithCommitCountsAndLanguages[]
    rc_stats: SHARED_Model__RepoCommitCountStats
}
