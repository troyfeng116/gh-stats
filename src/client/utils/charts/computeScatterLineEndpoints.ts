export const computeScatterLineEndpoints = (
    data: { x: number; y: number }[],
): { x1: number; y1: number; x2: number; y2: number }[] => {
    /*
    computes (x1,y1) -> (x2,y2) coordinates for a line segments in a time series scatter graph,
    given (x,y) data points
    */
    const sortedData = data.sort((a, b) => a.x - b.x)
    const lineEndpoints: { x1: number; y1: number; x2: number; y2: number }[] = []
    for (let i = 0; i < sortedData.length - 1; i++) {
        const { x: x1, y: y1 } = sortedData[i]
        const { x: x2, y: y2 } = sortedData[i + 1]
        lineEndpoints.push({ x1: x1, y1: y1, x2: x2, y2: y2 })
    }
    return lineEndpoints
}
