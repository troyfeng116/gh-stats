import { SHARED_Model__AllLanguageStats } from '../models/Language'
import { SHARED_Model__RepoWithCommitCountsAndLanguages } from '../models/Repos'
import { SHARED_Model__RepoCommitCountStats } from '../models/Stats'

import { SHARED_APIFields__BASE } from '.'

export interface SHARED_Model__LifetimeStats {
    language_stats: SHARED_Model__AllLanguageStats
    repos: SHARED_Model__RepoWithCommitCountsAndLanguages[]
    rc_stats: SHARED_Model__RepoCommitCountStats
}

export interface SHARED_APIFields__LifetimeStats extends SHARED_APIFields__BASE {
    lifetimeStats?: SHARED_Model__LifetimeStats
}
