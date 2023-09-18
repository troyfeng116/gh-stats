import {
    SHARED_Model__ContributionCalendarDay,
    SHARED_Model__ContributionCalendarWeek,
} from '@/shared/models/models/Contributions'

/**
 * Given weekdays mapping 0->Sun, 6->Sat, pad front of chronologically ordered days with `null`.
 * Guarantees consistency of first column in calendar grid.
 *
 * @param days Flattened and sorted non-empty list of days.
 * @returns Unmodified `days`, with `null`-padded values at front.
 */
const padFlattenedDays = (
    days: SHARED_Model__ContributionCalendarDay[],
): (SHARED_Model__ContributionCalendarDay | null)[] => {
    const { weekday: firstWeekday } = days[0]
    const paddedWeekdays = new Array(firstWeekday).fill(null)
    return [...paddedWeekdays, ...days]
}

/**
 * Given ordered list of contribution days, reorganize into seven rows corresponding to calendar view.
 * Pads front with `null` values to ensure reading from first column is consistent.
 *
 * @param days Ordered list of days of contributions.
 *
 * @returns Grid of contribution days, for use in client-side calendar grid view.
 */
const computeGridForDays = (
    days: SHARED_Model__ContributionCalendarDay[],
): (SHARED_Model__ContributionCalendarDay | null)[][] => {
    const calendarGrid: (SHARED_Model__ContributionCalendarDay | null)[][] = []
    for (let i = 0; i < 7; i++) {
        calendarGrid.push([])
    }

    const paddedDays: (SHARED_Model__ContributionCalendarDay | null)[] = padFlattenedDays(days)

    for (let i = 0; i < paddedDays.length; i++) {
        const day = paddedDays[i]
        // only padded at front for missing weekdays
        if (day === null) {
            calendarGrid[i].push(null)
        } else {
            const { weekday } = day
            calendarGrid[weekday].push(day)
        }
    }

    return calendarGrid
}

/**
 * Given list of contribution weeks, reorganize into list of grids by month/year,
 * each with seven rows corresponding to calendar view.
 * Pads front of each month/year grid with `null` values to ensure reading from first column is consistent.
 *
 * @param weeks List of weeks of contributions.
 *
 * @returns Grid of contribution days, for use in client-side calendar grid view.
 */
export const weeksToCalendarGridByMonthAndYear = (
    weeks: SHARED_Model__ContributionCalendarWeek[],
): { monthAndYear: string; grid: (SHARED_Model__ContributionCalendarDay | null)[][] }[] => {
    const allDays: SHARED_Model__ContributionCalendarDay[] = weeks
        .map(({ contributionDays }) => contributionDays)
        .flat(1)

    const contributionsByMonthAndYearDict: { [monthAndYear: string]: SHARED_Model__ContributionCalendarDay[] } = {}
    for (const contributionDay of allDays) {
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

    contributionsByMonthAndYearList.forEach(({ contributionDays }) => {
        contributionDays.sort(({ date: date1 }, { date: date2 }) => {
            return new Date(date1).getTime() - new Date(date2).getTime()
        })
    })

    return contributionsByMonthAndYearList.map(({ monthAndYear, contributionDays }) => {
        return {
            monthAndYear: monthAndYear,
            grid: computeGridForDays(contributionDays),
        }
    })
}
