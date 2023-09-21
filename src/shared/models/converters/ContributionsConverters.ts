import {
    SHARED_Model__CommitContributionsByRepo,
    SHARED_Model__ContributionCalendarWeek,
    SHARED_Model__ContributionLevelType,
    SHARED_Model__ContributionsAggregate,
    SHARED_Model__ContributionsCollection,
} from '../models/Contributions'

import { GH_GQL_Schema__ContributionsCollection } from '@/server/lib/gh-gql/Contributions/query'
import { GH_GQL_Schema__ContributionsAggregate } from '@/server/lib/gh-gql/ContributionsAggregate/query'
import { computeQuartiles, getQuartileForPoint } from '@/shared/utils/computeQuartiles'
import { getRepoKey } from '@/shared/utils/getRepoKeyFromRepoContributions'

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

const QUARTILE_TO_COLOR: { [quartile in SHARED_Model__ContributionLevelType]: string } = {
    [SHARED_Model__ContributionLevelType.NONE]: '#ebedf0',
    [SHARED_Model__ContributionLevelType.FIRST_QUARTILE]: '#9be9a8',
    [SHARED_Model__ContributionLevelType.SECOND_QUARTILE]: '#40c463',
    [SHARED_Model__ContributionLevelType.THIRD_QUARTILE]: '#30a14e',
    [SHARED_Model__ContributionLevelType.FOURTH_QUARTILE]: '#216e39',
}

/**
 * When merging weeks, recompute quartile values for each day.
 */
const REDUCER__contributionWeeksMerger = (
    w1: SHARED_Model__ContributionCalendarWeek[],
    w2: SHARED_Model__ContributionCalendarWeek[],
): SHARED_Model__ContributionCalendarWeek[] => {
    const mergedWeeks: SHARED_Model__ContributionCalendarWeek[] = [...w1, ...w2]
    const flattenedContributionCounts: number[] = mergedWeeks
        .map(({ contributionDays }) => contributionDays)
        .flat(1)
        .map(({ contributionCount }) => contributionCount)

    const updatedQuartiles = computeQuartiles(flattenedContributionCounts.filter((ct) => ct > 0))
    for (const week of mergedWeeks) {
        const { contributionDays } = week
        for (const day of contributionDays) {
            const { contributionCount } = day
            if (contributionCount === 0) {
                continue
            }

            const updatedQuartile = getQuartileForPoint(contributionCount, updatedQuartiles)
            day.contributionLevel = updatedQuartile
            day.color = QUARTILE_TO_COLOR[updatedQuartile]
        }
    }

    return mergedWeeks
}

/**
 * When merging contributions by repo, avoid duplicating repository contributions and aggregate by repository name.
 */
const REDUCER__contributionsByRepositoryMerger = (
    c1: SHARED_Model__CommitContributionsByRepo[],
    c2: SHARED_Model__CommitContributionsByRepo[],
): SHARED_Model__CommitContributionsByRepo[] => {
    const mergedContributionsByRepo: SHARED_Model__CommitContributionsByRepo[] = [...c1]
    for (const rc2 of c2) {
        let isRepoInMerged = false
        for (const rc1 of mergedContributionsByRepo) {
            if (getRepoKey(rc1) === getRepoKey(rc2)) {
                isRepoInMerged = true
                rc1.contributions.totalCount += rc2.contributions.totalCount
                rc1.contributions.nodes = [...rc1.contributions.nodes, ...rc2.contributions.nodes]
            }
        }
        if (!isRepoInMerged) {
            mergedContributionsByRepo.push(rc2)
        }
    }
    return mergedContributionsByRepo
}

export const REDUCER__contributionsCollection_INITIAL_VALUE: SHARED_Model__ContributionsCollection = {
    ...REDUCER__contributionsAggregate_INITIAL_VALUE,
    contributionCalendar: {
        isHalloween: true,
        weeks: [],
    },
    commitContributionsByRepository: [],
}

/**
 * Merge two contributions collections, for use when re-aggregating after breaking up a time range into chunks.
 */
export const REDUCER__contributionsCollectionMerger = (
    c1: SHARED_Model__ContributionsCollection,
    c2: SHARED_Model__ContributionsCollection,
): SHARED_Model__ContributionsCollection => {
    return {
        ...REDUCER__contributionsAggregateMerger(c1, c2),
        contributionCalendar: {
            isHalloween: c1.contributionCalendar.isHalloween && c2.contributionCalendar.isHalloween,
            weeks: REDUCER__contributionWeeksMerger(c1.contributionCalendar.weeks, c2.contributionCalendar.weeks),
        },
        commitContributionsByRepository: REDUCER__contributionsByRepositoryMerger(
            c1.commitContributionsByRepository,
            c2.commitContributionsByRepository,
        ),
    }
}
