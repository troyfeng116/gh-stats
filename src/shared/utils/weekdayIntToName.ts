export const FULL_WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

export const weekdayIntToFullName = (weekday: number): string => {
    if (weekday < 0 || weekday > 6) {
        weekday = 0
    }

    return FULL_WEEKDAYS[weekday]
}

export const SHORT_WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export const weekdayIntToShortName = (weekday: number): string => {
    if (weekday < 0 || weekday > 6) {
        weekday = 0
    }

    return SHORT_WEEKDAYS[weekday]
}
