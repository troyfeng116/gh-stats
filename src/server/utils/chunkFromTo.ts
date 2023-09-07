import { toDateStringISO8601UTC } from './dateUtils'

/**
 * Given from/to date range, break into multiple ranges of size at most `chunkLenDays`.
 * Returned chunk dates are ISO-8601 encoded UTC date strings: YYYY-MM-DDTHH:MM:SSZ,
 * for use in Github GraphQL endpoints with time range variables
 *
 * @param from Date string, timestamp (ms), or object
 * @param to Date string, timestamp (ms), or object
 * @param chunkLenDays size of each chunk. Defaults to `100`
 *
 * @returns List of chunks, in chronological order
 */
export const chunkFromToRange = (
    from: string | number | Date,
    to: string | number | Date,
    chunkLenDays = 100,
): { from: string; to: string }[] => {
    const chunks: { from: string; to: string }[] = []
    const chunkLenMs = chunkLenDays * 24 * 60 * 60 * 1000

    const fromTimestampMs = new Date(from).getTime()
    const toTimestampMs = new Date(to).getTime()
    for (let startTimestampMs = fromTimestampMs; startTimestampMs < toTimestampMs; startTimestampMs += chunkLenMs) {
        chunks.push({
            from: toDateStringISO8601UTC(startTimestampMs),
            to: toDateStringISO8601UTC(Math.min(startTimestampMs + chunkLenMs - 1, toTimestampMs)),
        })
    }

    return chunks
}
