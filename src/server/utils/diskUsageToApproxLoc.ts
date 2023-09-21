export const diskUsageToApproxLoc = (diskUsage: number): number => {
    const approxLoc = diskUsage / 29
    let trunc = 10
    if (approxLoc > 100000) {
        trunc = 10000
    } else if (approxLoc > 10000) {
        trunc = 1000
    } else if (approxLoc > 1000) {
        trunc = 100
    } else if (approxLoc > 500) {
        trunc = 50
    }
    return Number.parseInt((Math.ceil(approxLoc / trunc) * trunc).toFixed(0))
}
