/**
 * Client-side validation of `from`/`to` date query range.
 * Checks:
 * - either both defined or both undefined
 * - `from`/`to` are Date-parseable
 * - `from` < `to`
 *
 * @param from `from` end of query range.
 * @param to `to` end of query range
 * @returns Client-side error message if validation fails, else `null`.
 */
export const validateRangeQueryDates = (from?: string, to?: string): string | null => {
    if (from === undefined && to === undefined) {
        return null
    }

    if (from === undefined || to === undefined) {
        return 'Please specify a start and end range.'
    }

    try {
        const fromTs = Date.parse(from)
        const toTs = Date.parse(to)
        if (fromTs >= toTs) {
            return 'Start must be before end.'
        }

        return null
    } catch (e) {
        return `Input dates not supported: ${e}`
    }
}
