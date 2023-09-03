export const dataToContributionsDateMapping = (dataPoint: { x: number; y: number }) => {
    const { x, y } = dataPoint
    return `${new Date(x).toLocaleDateString()}: ${y} contributions`
}
