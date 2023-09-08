import { SHARED_Model__ContributionsAggregate, SHARED_Model__ContributionsCollection } from '../models/Contributions'

import { GH_GQL_Schema__ContributionsCollection } from '@/server/lib/gh-gql/Contributions/query'
import { GH_GQL_Schema__ContributionsAggregate } from '@/server/lib/gh-gql/ContributionsAggregate/query'

export const CONVERTER__contributionsAggregateSchemaToShared = (
    contributionsAggregateSchema: GH_GQL_Schema__ContributionsAggregate,
): SHARED_Model__ContributionsAggregate => {
    const {
        contributionCalendar: { totalContributions },
    } = contributionsAggregateSchema
    return { ...contributionsAggregateSchema, totalContributions: totalContributions }
}

export const CONVERTER__contributionsSchemaToShared = (
    contributionsCollectionSchema: GH_GQL_Schema__ContributionsCollection,
): SHARED_Model__ContributionsCollection => {
    const {
        contributionCalendar: { totalContributions },
    } = contributionsCollectionSchema
    return { ...contributionsCollectionSchema, totalContributions: totalContributions }
}

export const REDUCER__contributionsAggregate_INITIAL_VALUE: SHARED_Model__ContributionsAggregate = {
    restrictedContributionsCount: 0,
    totalCommitContributions: 0,
    totalIssueContributions: 0,
    totalPullRequestContributions: 0,
    totalPullRequestReviewContributions: 0,
    totalRepositoriesWithContributedCommits: 0,
    totalRepositoryContributions: 0,
    totalContributions: 0,
    startedAt: new Date(1e15).toISOString(),
    endedAt: new Date(0).toISOString(),
}

export const REDUCER__contributionsAggregateMerger = (
    c1: SHARED_Model__ContributionsAggregate,
    c2: SHARED_Model__ContributionsAggregate,
): SHARED_Model__ContributionsAggregate => {
    return {
        restrictedContributionsCount: c1.restrictedContributionsCount + c2.restrictedContributionsCount,
        totalCommitContributions: c1.totalCommitContributions + c2.totalCommitContributions,
        totalIssueContributions: c1.totalIssueContributions + c2.totalIssueContributions,
        totalPullRequestContributions: c1.totalPullRequestContributions + c2.totalPullRequestContributions,
        totalPullRequestReviewContributions:
            c1.totalPullRequestReviewContributions + c2.totalPullRequestReviewContributions,
        totalRepositoriesWithContributedCommits:
            c1.totalRepositoriesWithContributedCommits + c2.totalRepositoriesWithContributedCommits,
        totalRepositoryContributions: c1.totalRepositoryContributions + c2.totalRepositoryContributions,
        totalContributions: c1.totalContributions + c2.totalContributions,
        startedAt: new Date(c1.startedAt) < new Date(c2.startedAt) ? c1.startedAt : c2.startedAt,
        endedAt: new Date(c1.endedAt) > new Date(c2.endedAt) ? c1.endedAt : c2.endedAt,
    }
}
