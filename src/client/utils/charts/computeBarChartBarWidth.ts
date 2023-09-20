export const computeBarWidth = (
    numBars: number,
    width: number,
    paddingLeft: number,
    paddingRight: number,
    axisHorizontalPadding: number,
    barPadding: number,
    maxBarWidth = Number.MAX_VALUE,
): number => {
    const barsAvailableWidth =
        width - paddingRight - paddingLeft - 2 * axisHorizontalPadding - barPadding * (numBars + 1)
    return Math.min(maxBarWidth, barsAvailableWidth / Math.max(1, numBars))
}
