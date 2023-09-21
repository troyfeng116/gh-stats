/**
 * Converts date string, timestamp, or Date object to ISO 8601 UTC string format
 *
 * @param date Date string, timestamp, or object
 *
 * @returns ISO 8601 UTC formatted string, using `Date.toISOString`
 */
export const toDateStringISO8601UTC = (date: number | string | Date): string => {
    return new Date(date).toISOString()
}
