import { DAY_MS } from '@/shared/constants'

/**
 * Client-side validation of `from`/`to` date query range.
 * Checks:
 * - either both defined or both undefined
 * - `from`/`to` are Date-parseable
 * - `from` < `to`
 * - falls within `rangeBounds`
 *
 * @param rangeBounds Date objs representing minimum/maximum bounds for query range.
 * @param from `from` end of query range.
 * @param to `to` end of query range
 * @returns Client-side error message if validation fails, else `null`.
 */
export const validateRangeQueryDates = (
    from: string | undefined,
    to: string | undefined,
    rangeBounds: {
        min?: Date
        max?: Date
    },
): string | null => {
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

        const { min, max } = rangeBounds
        if (min !== undefined && fromTs < min.getTime() - DAY_MS) {
            return `Date range must be after ${min.toDateString()}`
        }

        if (max !== undefined && toTs > max.getTime() + DAY_MS) {
            return `Date range must be before ${max.toDateString()}`
        }

        return null
    } catch (e) {
        return `Input dates not supported: ${e}`
    }
}
