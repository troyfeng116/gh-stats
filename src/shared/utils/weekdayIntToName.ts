const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

export const weekdayIntToName = (weekday: number): string => {
    if (weekday < 0 || weekday > 6) {
        weekday = 0
    }

    return WEEKDAYS[weekday]
}
