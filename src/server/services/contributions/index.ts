import { SERVICE_Call__getViewer } from '../userCard'
import { SERVICE_Response__BASE } from '..'

import { GH_GQL_Call__Contributions } from '@/server/lib/gh-gql/Contributions'
import { GH_GQL_Schema__ContributionCalendarDay } from '@/server/lib/gh-gql/Contributions/query'
import { chunkFromToRange } from '@/server/utils/chunkFromTo'
import {
    aggregateContributionDayCountsByMonth,
    aggregateContributionDayCountsByMonthAndYear,
} from '@/server/utils/contributionDaysAggregators'
import { orderContributionMonthsByCalendarOrder } from '@/server/utils/monthStringUtils'
import { weeksToCalendarGridByMonthAndYear } from '@/server/utils/weeksToCalendarGrid'
import { SHARED_APIFields__Contributions } from '@/shared/models/apiFields/contributions'
import {
    CONVERTER__contributionsSchemaToShared,
    REDUCER__contributionsCollection_INITIAL_VALUE,
    REDUCER__contributionsCollectionMerger,
} from '@/shared/models/converters/ContributionsConverters'
import {
    SHARED_Model__ContributionsCollection,
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
    let maxIdx = 0
    const contributionsByWeekday = new Array(7).fill(0)
    for (let i = 0; i < dailyContributionData.length; i++) {
        const contributionDay = dailyContributionData[i]
        const { contributionCount, weekday } = contributionDay
        contributionsByWeekday[weekday] += contributionCount

        if (contributionCount > dailyContributionData[maxIdx].contributionCount) {
            maxIdx = i
        }
    }

    const { contributionCount: maxContributions, date: maxDate } = dailyContributionData[maxIdx]

    return {
        avgDailyContributions: totalContributions / dailyContributionData.length,
        contributionsByWeekday: contributionsByWeekday,
        mostActiveDay: {
            maxContributions: maxContributions,
            maxDate: maxDate,
        },
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
    const contributionsByMonthAndYearList: { monthAndYear: string; contributionCount: number }[] =
        aggregateContributionDayCountsByMonthAndYear(dailyContributionData)

    const contributionsByMonthList: { month: string; contributionCount: number }[] =
        aggregateContributionDayCountsByMonth(dailyContributionData)

    return {
        avgMonthlyContributions: totalContributions / contributionsByMonthAndYearList.length,
        contributionsByMonthAndYear: contributionsByMonthAndYearList,
        contributionsByMonth: orderContributionMonthsByCalendarOrder(contributionsByMonthList),
    }
}

interface SERVICE_Response__ContributionsCollection extends SERVICE_Response__BASE {
    contributionsCollection?: SHARED_Model__ContributionsCollection
}

/**
 * Retrieves contributions collection.
 * Assumes `from` and `to` are valid if set; that is, ISO 6801 UTC formatted strings, with range at most 1 year).
 *
 * @param from If defined, valid ISO 6801 UTC formatted string. At most 1 year before `to`.
 * @param to If defined, valid ISO 6801 UTC formatted string. At most 1 year after `from`.
 *
 * @returns Contributions collection if GraphQL request successful.
 */
const getContributionsCollectionForSingleChunk = async (
    accessToken: string,
    from?: string,
    to?: string,
): Promise<SERVICE_Response__ContributionsCollection> => {
    const { success, error, contributions } = await GH_GQL_Call__Contributions(accessToken, {
        from: from,
        to: to,
    })

    if (!success || contributions === undefined) {
        return { success: false, error: error, contributionsCollection: undefined }
    }

    const convertedContributionsCollection: SHARED_Model__ContributionsCollection =
        CONVERTER__contributionsSchemaToShared(contributions)

    return { success: true, contributionsCollection: convertedContributionsCollection }
}

/**
 * Chunks `from` and `to` range into chunks of one year,
 * to avoid range limit errors from GraphQL API.
 *
 * @param from Date string.
 * @param to Date string.
 *
 * @returns Reduced contribution collection models if all requests successful (transaction). Fails if at least one request fails.
 */
const getContributionsCollectionWithRangeChunks = async (
    accessToken: string,
    from: string,
    to: string,
): Promise<SERVICE_Response__ContributionsCollection> => {
    const rangeChunks = chunkFromToRange(from, to, 100)

    const rangeChunkResults: SHARED_Model__ContributionsCollection[] = []
    for (const { from: chunkFrom, to: chunkTo } of rangeChunks) {
        const { success, error, contributionsCollection } = await getContributionsCollectionForSingleChunk(
            accessToken,
            chunkFrom,
            chunkTo,
        )
        if (!success || contributionsCollection === undefined) {
            return { success: false, error: error, contributionsCollection: undefined }
        }
        rangeChunkResults.push(contributionsCollection)
    }

    const mergedContributionsCollection: SHARED_Model__ContributionsCollection = rangeChunkResults.reduce(
        (prev, cur) => {
            return REDUCER__contributionsCollectionMerger(prev, cur)
        },
        REDUCER__contributionsCollection_INITIAL_VALUE,
    )

    return { success: true, contributionsCollection: mergedContributionsCollection }
}

/**
 * Given any `from` and `to` range, retrieve contribution collection for that time range.
 * Succeeds even if `from` and `to` are set to more than a year apart.
 *
 * @param from If defined, valid ISO 6801 UTC formatted string.
 * @param to If defined, valid ISO 6801 UTC formatted string.
 */
export const SERVICE_Call__getContributions = async (
    accessToken: string,
    from?: string,
    to?: string,
): Promise<SHARED_APIFields__Contributions> => {
    const viewerPromise = SERVICE_Call__getViewer(accessToken)
    const contributionsCollectionPromise =
        from !== undefined && to !== undefined
            ? getContributionsCollectionWithRangeChunks(accessToken, from, to)
            : getContributionsCollectionForSingleChunk(accessToken, from, to)
    const [viewerResult, contributionsCollectionResult] = await Promise.all([
        viewerPromise,
        contributionsCollectionPromise,
    ])

    const { success: viewerSuccess, error: viewerError, viewer } = viewerResult
    if (!viewerSuccess || viewer === undefined) {
        return { success: false, error: viewerError, contributionsClientInfo: undefined }
    }

    const {
        success: contributionsSuccess,
        error: contributionsError,
        contributionsCollection,
    } = contributionsCollectionResult
    if (!contributionsSuccess || contributionsCollection === undefined) {
        return { success: false, error: contributionsError, contributionsClientInfo: undefined }
    }

    const { createdAt } = viewer

    const { contributionCalendar, totalContributions } = contributionsCollection
    const { weeks } = contributionCalendar

    const dailyContributionData: GH_GQL_Schema__ContributionCalendarDay[] = weeks
        .map((week) => {
            return week.contributionDays
        })
        .flat(1)

    const { longestStreak, longestDrySpell } = extractStreakInfo(dailyContributionData)

    return {
        contributionsClientInfo: {
            contributions: contributionsCollection,
            calendarGridByMonthAndYear: weeksToCalendarGridByMonthAndYear(weeks),
            dailyInfo: extractDailyContributionsInfo(dailyContributionData, totalContributions),
            monthlyInfo: extractMonthlyContributionsInfo(dailyContributionData, totalContributions),
            longestContributionStreak: longestStreak,
            longestContributionDrySpell: longestDrySpell,
            accountCreatedDate: createdAt,
        },
        success: true,
    }
}
