import { SERVICE_Response__BASE } from '..'

import { GH_GQL_Call__Contributions } from '@/server/lib/gh-gql/Contributions'
import { GH_GQL_Schema__ContributionCalendarDay } from '@/server/lib/gh-gql/Contributions/query'
import { GH_GQL_Call__ContributionsAggregate } from '@/server/lib/gh-gql/ContributionsAggregate'
import { chunkFromToRange } from '@/server/utils/chunkFromTo'
import { SHARED_APIFields__Contributions } from '@/shared/models/apiFields/contributions'
import {
    CONVERTER__contributionsAggregateSchemaToShared,
    CONVERTER__contributionsSchemaToShared,
    REDUCER__contributionsAggregateMerger,
    REDUCER_INITIAL_VALUE as REDUCER__contributionsAggregate_INITIAL_VALUE,
} from '@/shared/models/converters/ContributionsConverters'
import {
    SHARED_Model__ContributionsAggregate,
    SHARED_Model__DailyContributionsInfo,
    SHARED_Model__MonthlyContributionsInfo,
} from '@/shared/models/models/Contributions'

/**
 * Given daily contribution data (flattened from contributions.calender.weeks),
 * find longest contribution and no-contribution streaks by day
 *
 * @param dailyContributionData Flattened list of contribution calendar days
 *
 * @returns Aggregate streak info
 */
const extractStreakInfo = (
    dailyContributionData: GH_GQL_Schema__ContributionCalendarDay[],
): { longestStreak: number; longestDrySpell: number } => {
    let longestStreak = 0,
        longestDrySpell = 0
    let curStreak = 0,
        curDrySpell = 0
    for (const contributionDay of dailyContributionData) {
        const { contributionCount } = contributionDay
        if (contributionCount > 0) {
            curStreak++
            curDrySpell = 0
        } else {
            curStreak = 0
            curDrySpell++
        }
        longestStreak = Math.max(longestStreak, curStreak)
        longestDrySpell = Math.max(longestDrySpell, curDrySpell)
    }

    return { longestStreak: longestStreak, longestDrySpell: longestDrySpell }
}

/**
 * Computes daily contribution data (total contributions by weekday, avg daily contributions)
 * as needed in ContributionsClientInfo.DailyContributionInfo
 *
 * @param dailyContributionData Flattened list of contribution calendar days
 * @param totalContributions Total contributions
 *
 * @returns Aggregate daily contributions info
 */
const extractDailyContributionsInfo = (
    dailyContributionData: GH_GQL_Schema__ContributionCalendarDay[],
    totalContributions: number,
): SHARED_Model__DailyContributionsInfo => {
    const contributionsByWeekday = new Array(7).fill(0)
    for (const contributionDay of dailyContributionData) {
        const { contributionCount, weekday } = contributionDay
        contributionsByWeekday[weekday] += contributionCount
    }

    return {
        avgDailyContributions: totalContributions / dailyContributionData.length,
        contributionsByWeekday: contributionsByWeekday,
    }
}

/**
 * Computes monthly contribution data (total contributions by month, avg monthly contributions)
 * as needed in ContributionsClientInfo.MonthlyContributionInfo
 *
 * @param dailyContributionData Flattened list of contribution calendar days
 * @param totalContributions Total contributions
 *
 * @returns Aggregate monthly contributions info
 */
const extractMonthlyContributionsInfo = (
    dailyContributionData: GH_GQL_Schema__ContributionCalendarDay[],
    totalContributions: number,
): SHARED_Model__MonthlyContributionsInfo => {
    const contributionsByMonthDict: { [month: string]: number } = {}
    for (const contributionDay of dailyContributionData) {
        const { contributionCount, date } = contributionDay
        const month = new Date(date).toLocaleDateString(undefined, { month: 'long', year: 'numeric' })
        if (!(month in contributionsByMonthDict)) {
            contributionsByMonthDict[month] = 0
        }
        contributionsByMonthDict[month] += contributionCount
    }

    const contributionsByMonth: { month: string; contributionCount: number }[] = []
    for (const month in contributionsByMonthDict) {
        contributionsByMonth.push({ month: month, contributionCount: contributionsByMonthDict[month] })
    }

    return {
        avgMonthlyContributions: totalContributions / 12,
        contributionsByMonth: contributionsByMonth,
    }
}

export const SERVICE_Call__getContributions = async (
    accessToken: string,
    from?: string,
    to?: string,
): Promise<SHARED_APIFields__Contributions> => {
    const { success, error, contributions } = await GH_GQL_Call__Contributions(accessToken, {
        from: from,
        to: to,
    })

    if (!success || contributions === undefined) {
        return { contributionsClientInfo: undefined, success: false, error: error }
    }

    const { contributionCalendar } = contributions
    const { weeks, totalContributions } = contributionCalendar

    const dailyContributionData: GH_GQL_Schema__ContributionCalendarDay[] = weeks
        .map((week) => {
            return week.contributionDays
        })
        .flat(1)

    const { longestStreak, longestDrySpell } = extractStreakInfo(dailyContributionData)

    return {
        contributionsClientInfo: {
            contributions: CONVERTER__contributionsSchemaToShared(contributions),
            dailyInfo: extractDailyContributionsInfo(dailyContributionData, totalContributions),
            monthlyInfo: extractMonthlyContributionsInfo(dailyContributionData, totalContributions),
            longestContributionStreak: longestStreak,
            longestContributionDrySpell: longestDrySpell,
        },
        success: true,
    }
}

/* ======== contributions aggregate services ======== */

interface SERVICE_Response__ContributionsAggregate extends SERVICE_Response__BASE {
    contributionsAggregate?: SHARED_Model__ContributionsAggregate
}

/**
 * Retrieves aggregate contributions.
 * Assumes `from` and `to` are valid if set; that is, ISO 6801 UTC formatted strings, with range at most 1 year).
 *
 * @param from If defined, valid ISO 6801 UTC formatted string. At most 1 year before `to`.
 * @param to If defined, valid ISO 6801 UTC formatted string. At most 1 year after `from`.
 *
 * @returns Aggregate contributions if GraphQL request successful.
 */
const getContributionsAggregateForSingleChunk = async (
    accessToken: string,
    from?: string,
    to?: string,
): Promise<SERVICE_Response__ContributionsAggregate> => {
    const { success, error, contributionsAggregate } = await GH_GQL_Call__ContributionsAggregate(accessToken, {
        from: from,
        to: to,
    })

    if (!success || contributionsAggregate === undefined) {
        return { success: false, error: error, contributionsAggregate: undefined }
    }

    const convertedContributionsAggregate: SHARED_Model__ContributionsAggregate =
        CONVERTER__contributionsAggregateSchemaToShared(contributionsAggregate)

    return { success: true, contributionsAggregate: convertedContributionsAggregate }
}

interface SERVICE_Response__ContributionsAggregateWithRangeChunks extends SERVICE_Response__BASE {
    contributionsAggregateList?: SHARED_Model__ContributionsAggregate[]
}

/**
 * Chunks `from` and `to` range into chunks of one year,
 * to avoid range limit errors from GraphQL API.
 *
 * @param from Date string.
 * @param to Date string.
 *
 * @returns List of aggregate contribution models if all requests successful (transaction). Fails if at least one request fails.
 */
const getContributionsAggregateWithRangeChunks = async (
    accessToken: string,
    from: string,
    to: string,
): Promise<SERVICE_Response__ContributionsAggregateWithRangeChunks> => {
    const rangeChunks = chunkFromToRange(from, to, 365)

    const rangeChunkResults: SHARED_Model__ContributionsAggregate[] = []
    for (const { from: chunkFrom, to: chunkTo } of rangeChunks) {
        const { success, error, contributionsAggregate } = await getContributionsAggregateForSingleChunk(
            accessToken,
            chunkFrom,
            chunkTo,
        )
        if (!success || contributionsAggregate === undefined) {
            return { success: false, error: error, contributionsAggregateList: undefined }
        }
        rangeChunkResults.push(contributionsAggregate)
    }

    return { success: true, contributionsAggregateList: rangeChunkResults }
}

/**
 * Given any `from` and `to` range, retrieve aggregate contribution stats.
 * Succeeds even if `from` and `to` are set to more than a year apart.
 *
 * @param from If defined, valid ISO 6801 UTC formatted string.
 * @param to If defined, valid ISO 6801 UTC formatted string.
 */
export const SERVICE_Call__getContributionsAggregate = async (
    accessToken: string,
    from?: string,
    to?: string,
): Promise<SERVICE_Response__ContributionsAggregate> => {
    if (from !== undefined && to !== undefined) {
        const {
            success: chunkSuccess,
            error: chunkError,
            contributionsAggregateList,
        } = await getContributionsAggregateWithRangeChunks(accessToken, from, to)

        if (!chunkSuccess || contributionsAggregateList === undefined) {
            return { success: false, error: chunkError, contributionsAggregate: undefined }
        }

        const mergedContributionsAggregate: SHARED_Model__ContributionsAggregate = contributionsAggregateList.reduce(
            (prev, cur) => {
                return REDUCER__contributionsAggregateMerger(prev, cur)
            },
            REDUCER__contributionsAggregate_INITIAL_VALUE,
        )

        return { success: true, contributionsAggregate: mergedContributionsAggregate }
    }

    return await getContributionsAggregateForSingleChunk(accessToken, from, to)
}
