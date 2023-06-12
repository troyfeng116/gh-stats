import { SHARED_Model__LifetimeStats } from '../models/Stats'

export interface SHARED_APIFields__BASE {
    success: boolean
    error?: string
}

export interface SHARED_APIFields__LifetimeStats extends SHARED_APIFields__BASE {
    lifetimeStats?: SHARED_Model__LifetimeStats
}
