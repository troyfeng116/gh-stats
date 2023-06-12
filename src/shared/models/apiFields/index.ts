import { SHARED_Model__UserCardData } from '../models/UserCard'

export interface SHARED_APIFields__BASE {
    success: boolean
    error?: string
}

export interface SHARED_APIFields__GetToken extends SHARED_APIFields__BASE {
    accessToken?: string
}

export type SHARED_APIFields__ValidateToken = SHARED_APIFields__BASE

export interface SHARED_APIFields__GetUserCard extends SHARED_APIFields__BASE {
    userCard?: SHARED_Model__UserCardData
}
