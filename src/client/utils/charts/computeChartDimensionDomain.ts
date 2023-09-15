import * as d3 from 'd3'

/**
 * Extract min and max values from values along dimension.
 *
 * @param values Arbitrary set of values along one dimension of d3 chart.
 * @param minZero Whether minimum value should be set to zero. Default `false`
 * @param paddingRatio Scales resulting [min, max] by `(max - min) * paddingRatio`. Defaults to `0.0`.
 *
 * @returns [scaledMin, scaledMax] pair
 */
export const computeChartDimensionDomain = (
    values: number[],
    minZero = false,
    paddingRatio = 0.0,
): [number, number] => {
    const rawMax = d3.max(values) || 100
    const rawMin = minZero ? 0 : d3.min(values) || 0
    const rawRange = rawMax - rawMin
    return [minZero ? 0 : rawMin - rawRange * paddingRatio, rawMax + rawRange * paddingRatio]
}
