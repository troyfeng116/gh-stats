import { GH_GQL_Call__Contributions } from '@/server/lib/gh-gql/Contributions'
import { GH_GQL_Schema__ContributionCalendarDay } from '@/server/lib/gh-gql/Contributions/query'
import { SHARED_APIFields__Contributions } from '@/shared/models/apiFields/contributions'
import { CONVERTER__contributionsSchemaToShared } from '@/shared/models/converters/ContributionsConverters'
import {
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
