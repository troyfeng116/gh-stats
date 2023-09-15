const MONTH_MAP: { [month: string]: number } = {
    January: 1,
    February: 2,
    March: 3,
    April: 4,
    May: 5,
    June: 6,
    July: 7,
    August: 8,
    September: 9,
    October: 10,
    November: 11,
    December: 12,
}

/**
 * Populates given dictionary with zeroes for each missing month name to avoid client-side access errors.
 *
 * @param monthDict Dictionary for which month keys should be populated.
 *
 * @returns Reference to original dictionary, with zero-defaulted month keys.
 */
export const populateMonthDictWithMissingMonths = (monthDict: {
    [month: string]: number
}): { [month: string]: number } => {
    for (const key in MONTH_MAP) {
        if (!(key in monthDict)) {
            monthDict[key] = 0
        }
    }
    return monthDict
}

/**
 * Given contributions by month array, sorts (in-place) according to calendar month order.
 *
 * @param contributionsByMonth List of contributions by month.
 *
 * @returns Original list reference, mutated with months in Jan-Dec calendar order.
 */
export const orderContributionMonthsByCalendarOrder = (
    contributionsByMonth: { month: string; contributionCount: number }[],
): { month: string; contributionCount: number }[] => {
    return contributionsByMonth.sort(({ month: month1 }, { month: month2 }) => {
        return MONTH_MAP[month1] - MONTH_MAP[month2]
    })
}
