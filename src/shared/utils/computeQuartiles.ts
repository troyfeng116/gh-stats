import { SHARED_Model__ContributionLevelType } from '../models/models/Contributions'

/**
 * Computes median of values in arr[l:r], inclusive.
 * Assumes arr.length > 0 and `arr` is sorted.
 */
const computeMedian = (arr: number[], l: number, r: number): number => {
    const m = Math.floor((l + r) / 2)
    return (r - l + 1) % 2 == 0 ? (arr[m] + arr[m + 1]) / 2.0 : arr[m]
}

/**
 * Computes 25/50/75 quartiles for non-empty, not-necessarily-sorted list of numbers.
 */
export const computeQuartiles = (arr: number[]): [number, number, number] => {
    const n = arr.length
    const sortedArr = arr.sort((a, b) => a - b)
    const median = computeMedian(sortedArr, 0, n - 1)
    const m = Math.floor((n - 1) / 2)
    return [computeMedian(sortedArr, 0, m - (arr.length % 2)), median, computeMedian(sortedArr, m + 1, n - 1)]
}

/**
 * Given quartiles and some data point, return which quartile the data point belongs in.
 * If on quartile boundary, chooses right-most quartile.
 *
 * @param point Data point in.
 * @param quartiles 25/50/75 quartiles.
 *
 * @returns Member of `SHARED_Model__ContributionLevelType` corresponding to which quartile `point` falls in.
 */
export const getQuartileForPoint = (
    point: number,
    quartiles: [number, number, number],
): SHARED_Model__ContributionLevelType => {
    const [first, second, third] = quartiles
    if (point <= first) {
        return SHARED_Model__ContributionLevelType.FIRST_QUARTILE
    }
    if (point <= second) {
        return SHARED_Model__ContributionLevelType.SECOND_QUARTILE
    }
    if (point <= third) {
        return SHARED_Model__ContributionLevelType.THIRD_QUARTILE
    }
    return SHARED_Model__ContributionLevelType.FOURTH_QUARTILE
}
