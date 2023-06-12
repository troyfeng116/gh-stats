import { SHARED_Model__LifetimeStats } from '../models/Stats'
import { SHARED_Model__UserCardData } from '../models/UserCard'

export interface SHARED_APIFields__BASE {
    success: boolean
    error?: string
}

export interface SHARED_APIFields__GetUserCard extends SHARED_APIFields__BASE {
    userCard?: SHARED_Model__UserCardData
}

export interface SHARED_APIFields__LifetimeStats extends SHARED_APIFields__BASE {
    lifetimeStats?: SHARED_Model__LifetimeStats
}
