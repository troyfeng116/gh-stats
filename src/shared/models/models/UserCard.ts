import { SHARED_Model__ContributionsAggregate } from './Contributions'

export interface SHARED_Model__UserCard {
    userId: string
    name: string | undefined
    email: string | undefined
    followers: number
    following: number
    createdAt: string
    avatarUrl: string
    totalRepos: number
    totalPRs: number
}

export interface SHARED_Model__UserCardClientInfo {
    userCard: SHARED_Model__UserCard
    contributionsAggregate: SHARED_Model__ContributionsAggregate
}
