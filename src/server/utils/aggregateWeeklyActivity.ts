import { SHARED_Data_WeeklyContributionActivityData } from '@/shared/models'

export const aggregateWeeklyContributorActivity = (
    weeks: SHARED_Data_WeeklyContributionActivityData[],
): {
    numLines: number
    numAdditions: number
    numDeletions: number
} => {
    let numAdditions = 0,
        numDeletions = 0
    for (let i = 0; i < weeks.length; i++) {
        const { a, d } = weeks[i]
        numAdditions += a
        numDeletions += d
    }

    return {
        numLines: numAdditions - numDeletions,
        numAdditions: numAdditions,
        numDeletions: numDeletions,
    }
}
