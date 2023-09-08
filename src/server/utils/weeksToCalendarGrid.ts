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
 * Given list of contribution weeks, reorganize into grid with seven rows corresponding to calendar view.
 * Pads front with `null` values to ensure reading from first column is consistent.
 *
 * @param weeks List of weeks of contributions.
 *
 * @returns Grid of contribution days, for use in client-side calendar grid view.
 */
export const weeksToCalendarGrid = (
    weeks: SHARED_Model__ContributionCalendarWeek[],
): (SHARED_Model__ContributionCalendarDay | null)[][] => {
    const calendarGrid: (SHARED_Model__ContributionCalendarDay | null)[][] = []
    for (let i = 0; i < 7; i++) {
        calendarGrid.push([])
    }

    const flattenedDays: SHARED_Model__ContributionCalendarDay[] = weeks
        .map(({ contributionDays }) => contributionDays)
        .flat(1)
        .sort(({ date: date1 }, { date: date2 }) => {
            return new Date(date1).getTime() - new Date(date2).getTime()
        })

    if (flattenedDays.length === 0) {
        return calendarGrid
    }

    const paddedFlattenedDays: (SHARED_Model__ContributionCalendarDay | null)[] = padFlattenedDays(flattenedDays)

    for (let i = 0; i < paddedFlattenedDays.length; i++) {
        const day = paddedFlattenedDays[i]
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
