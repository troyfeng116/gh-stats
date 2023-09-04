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
        for (const day of contributionDays) {
            const { weekday } = day
            calendarGrid[weekday].push(day)
        }
    }

    return calendarGrid
}
