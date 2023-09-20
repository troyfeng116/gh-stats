/**
 * Given raw data to be arranged in pie chart,
 * compute size of each pie chart slice, in radians.
 *
 * @param data Raw data to be represented in pie chart.
 * @param minRadians TODO: minimum size of sector, in radians. Defaults to `2\pi / 60`.
 *
 * @returns Copy of `data`, with values replaced by radian sizes of corresponding sector.
 */
export const computePieChartSlices = (
    data: { label: string; value: number; color?: string }[],
    // minRadians = Math.PI / 30,
): { label: string; startRadians: number; endRadians: number; color?: string }[] => {
    const total = data.reduce((prevTotal, { value }) => prevTotal + value, 0)

    const dataWithRadians: { label: string; startRadians: number; endRadians: number; color?: string }[] = []
    let startRadians = Math.PI / 2
    for (const { label, value, color } of data) {
        const sectorSizeRadians = 2 * Math.PI * (value / total)
        dataWithRadians.push({
            label: label,
            color: color,
            startRadians: startRadians - sectorSizeRadians,
            endRadians: startRadians,
        })
        startRadians -= sectorSizeRadians
    }

    return dataWithRadians
}
