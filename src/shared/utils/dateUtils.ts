/**
 * Formats given date into caller locale, formatted `M/D/YYYY`.
 *
 * @param date Date string/timestamp/object.
 *
 * @returns Date formatted in caller locale, formatted `M/D/YYYY`.
 */
export const formatDateLocale__MDYYYY = (date: string | number | Date): string => {
    return new Date(date).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
    })
}

/**
 * Formats given date into UTC string, formatted `M/D/YYYY`.
 *
 * @param date Date string/timestamp/object.
 *
 * @returns Date formatted in UTC, formatted `M/D/YYYY`.
 */
export const formatDateUTC__MDYYYY = (date: string | number | Date): string => {
    return new Date(date).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        timeZone: 'UTC',
    })
}

/**
 * Formats given date into UTC string, formatted `M/D/YY`.
 *
 * @param date Date string/timestamp/object.
 *
 * @returns Date formatted in UTC, formatted `M/D/YY`.
 */
export const formatDateUTC__MDYY = (date: string | number | Date): string => {
    return new Date(date).toLocaleDateString(undefined, {
        year: '2-digit',
        month: 'numeric',
        day: 'numeric',
        timeZone: 'UTC',
    })
}

/**
 * Formats given date into UTC string, formatted `WEEKDAY, MMMM/D/YYYY`.
 *
 * @param date Date string/timestamp/object.
 *
 * @returns Date formatted in UTC, formatted `WEEKDAY, MMMM/D/YYYY`.
 */
export const formatDateUTC__WWMMMMDYYYY = (date: string | number | Date): string => {
    return new Date(date).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long',
        timeZone: 'UTC',
    })
}

/**
 * Formate date string/timestamp/object to string.
 *
 * @param date Date string/timestamp/object.
 * @param options `Intl.DateTimeFormatOptions` object. Defaults to `{}`.
 * @param utc Whether to convert string in UTC time. Defaults to `false`.
 *
 * @returns Formatted date string.
 */
export const formatDate = (
    date: string | number | Date,
    options: Intl.DateTimeFormatOptions = {},
    utc = false,
): string => {
    return new Date(date).toLocaleDateString(undefined, {
        ...options,
        timeZone: utc ? 'UTC' : options?.timeZone,
    })
}
