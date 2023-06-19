import {
    SHARED_Model__ContributionCalendarDay,
    SHARED_Model__ContributionCalendarWeek,
} from '@/shared/models/models/Contributions'

export const weeksToCalendarGrid = (
    weeks: SHARED_Model__ContributionCalendarWeek[],
): SHARED_Model__ContributionCalendarDay[][] => {
    const calendarGrid: SHARED_Model__ContributionCalendarDay[][] = []
    for (let i = 0; i < 7; i++) {
        calendarGrid.push([])
    }

    for (let i = 0; i < weeks.length; i++) {
        const week = weeks[i]
        const { contributionDays } = week
        for (let j = 0; j < contributionDays.length; j++) {
            const day = contributionDays[j]
            const { weekday } = day
            calendarGrid[weekday].push(day)
        }
    }

    return calendarGrid
}
