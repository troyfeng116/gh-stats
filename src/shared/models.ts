import { SHARED_APIFields__BASE } from './models/apiFields'
import {
    SHARED_Model__RepoCommitCountStats,
    SHARED_Model__RepoWithCommitCountsAndLanguages,
} from './models/models/Repos'

/* ======== languages ======== */

export interface SHARED_Model__AllLanguageStats {
    totalDiskUsage: number
    allLanguageData: {
        size: number
        color: string
        name: string
    }[]
}

/* ======== aggregate ======== */

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

export interface SHARED_APIFields__LinesStats extends SHARED_APIFields__BASE {
    lines_stats: SHARED_Model__LinesStats
}

export interface SHARED_Model__LifetimeStats {
    language_stats: SHARED_Model__AllLanguageStats
    repos: SHARED_Model__RepoWithCommitCountsAndLanguages[]
    rc_stats: SHARED_Model__RepoCommitCountStats
}

export interface SHARED_APIFields__LifetimeStats extends SHARED_APIFields__BASE {
    lifetimeStats?: SHARED_Model__LifetimeStats
}

/* ======== lines of code ======== */
