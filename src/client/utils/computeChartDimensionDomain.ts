import * as d3 from 'd3'

/**
 * Extract min and max values from values along dimension.
 *
 * @param values Arbitrary set of values along one dimension of d3 chart.
 * @param minZero Whether minimum value should be set to zero. Default `false`
 *
 * @returns [scaledMin, scaledMax] pair
 */
export const computeChartDimensionDomain = (values: number[], minZero = false): [number, number] => {
    return [minZero ? 0 : d3.min(values) || 0, d3.max(values) || 100]
}
