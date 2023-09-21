import { GH_GQL_Schema__ContributionCalendarDay } from '../lib/gh-gql/Contributions/query'

import { populateMonthDictWithMissingMonths } from './monthStringUtils'

import { SHARED_Model__ContributionCalendarDay } from '@/shared/models/models/Contributions'

/**
 * Creates list of contribution day groupings, grouped by month/year.
 *
 * @param contributionDays All contribution days to be grouped.
 *
 * @returns List of grouped contribution days by month/year; month strings formatted as short strings.
 */
export const groupContributionDaysByMonthAndYear = (
    contributionDays: SHARED_Model__ContributionCalendarDay[],
): {
    monthAndYear: string
    contributionDays: SHARED_Model__ContributionCalendarDay[]
}[] => {
    const contributionsByMonthAndYearDict: { [monthAndYear: string]: SHARED_Model__ContributionCalendarDay[] } = {}
    for (const contributionDay of contributionDays) {
        const { date } = contributionDay

        const monthAndYear = new Date(date).toLocaleDateString(undefined, {
            month: 'long',
            year: 'numeric',
            timeZone: 'UTC',
        })
        if (!(monthAndYear in contributionsByMonthAndYearDict)) {
            contributionsByMonthAndYearDict[monthAndYear] = []
        }
        contributionsByMonthAndYearDict[monthAndYear].push(contributionDay)
    }

    const contributionsByMonthAndYearList: {
        monthAndYear: string
        contributionDays: SHARED_Model__ContributionCalendarDay[]
    }[] = []
    for (const monthAndYear in contributionsByMonthAndYearDict) {
        contributionsByMonthAndYearList.push({
            monthAndYear: new Date(monthAndYear).toLocaleDateString(undefined, {
                month: 'short',
                timeZone: 'UTC',
            }),
            contributionDays: contributionsByMonthAndYearDict[monthAndYear],
        })
    }

    return contributionsByMonthAndYearList
}

/**
 * Find total contribution count for each month/year represented in list of contribution days.
 *
 * @param contributionDays Contribution days over which to aggregate contribution counts per month/year.
 *
 * @returns List of aggregated contribution counts, grouped by month/year.
 */
export const aggregateContributionDayCountsByMonthAndYear = (
    contributionDays: GH_GQL_Schema__ContributionCalendarDay[],
): {
    monthAndYear: string
    contributionCount: number
}[] => {
    const contributionsByMonthAndYearDict: { [monthAndYear: string]: number } = {}
    for (const contributionDay of contributionDays) {
        const { contributionCount, date } = contributionDay

        const monthAndYear = new Date(date).toLocaleDateString(undefined, {
            month: 'long',
            year: 'numeric',
            timeZone: 'UTC',
        })
        if (!(monthAndYear in contributionsByMonthAndYearDict)) {
            contributionsByMonthAndYearDict[monthAndYear] = 0
        }
        contributionsByMonthAndYearDict[monthAndYear] += contributionCount
    }

    const contributionsByMonthAndYearList: { monthAndYear: string; contributionCount: number }[] = []
    for (const monthAndYear in contributionsByMonthAndYearDict) {
        contributionsByMonthAndYearList.push({
            monthAndYear: monthAndYear,
            contributionCount: contributionsByMonthAndYearDict[monthAndYear],
        })
    }

    return contributionsByMonthAndYearList
}

/**
 * Find total contribution count for each calendar month represented in list of contribution days.
 * Calendar months with no contributions are added with zero contributions.
 *
 * @param contributionDays Contribution days over which to aggregate contribution counts per month.
 *
 * @returns List of aggregated contribution counts, grouped by calendar month name (formatted `MMMM`).
 */
export const aggregateContributionDayCountsByMonth = (
    contributionDays: GH_GQL_Schema__ContributionCalendarDay[],
): {
    month: string
    contributionCount: number
}[] => {
    let contributionsByMonthDict: { [month: string]: number } = {}
    for (const contributionDay of contributionDays) {
        const { contributionCount, date } = contributionDay

        const month = new Date(date).toLocaleDateString(undefined, { month: 'long', timeZone: 'UTC' })
        if (!(month in contributionsByMonthDict)) {
            contributionsByMonthDict[month] = 0
        }
        contributionsByMonthDict[month] += contributionCount
    }

    contributionsByMonthDict = populateMonthDictWithMissingMonths(contributionsByMonthDict)
    const contributionsByMonthList: { month: string; contributionCount: number }[] = []
    for (const month in contributionsByMonthDict) {
        contributionsByMonthList.push({ month: month, contributionCount: contributionsByMonthDict[month] })
    }

    return contributionsByMonthList
}
