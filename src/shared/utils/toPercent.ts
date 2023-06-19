export const toPercent = (numerator: number, denominator: number, places = 2): string => {
    return ((numerator / denominator) * 100).toFixed(places)
}
