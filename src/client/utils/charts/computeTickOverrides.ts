export const computeAxisTickOverrides = (values: number[], maxTicks: number): number[] => {
    values.sort()
    const n = values.length
    if (n <= 1 || n <= maxTicks) {
        return values
    }

    const gapSizeCeil = Math.ceil(n / (maxTicks - 1))
    const ticksSubset = []
    let idx = 0
    while (idx + gapSizeCeil < n - 1) {
        ticksSubset.push(values[idx])
        idx += gapSizeCeil
    }
    ticksSubset.push(values[n - 1])
    return ticksSubset
}
