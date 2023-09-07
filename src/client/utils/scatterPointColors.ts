const COLORS = [
    'rgb(129,129,255)',
    'rgb(129,255,129)',
    'rgb(255,129,129)',
    'rgb(129,255,255)',
    'rgb(255,129,255)',
    'rgb(255,255,129)',

    'rgb(69,219,255)',
    'rgb(69,255,219)',
    'rgb(255,219,69)',
    'rgb(219,69,255)',
    'rgb(219,255,219)',
    'rgb(255,219,69)',

    'rgb(69,255,255)',
    'rgb(255,69,255)',
    'rgb(255,255,69)',
]

export const attachScatterPointColors = (
    scatterPoints: { points: { x: number; y: number }[]; repoKey: string; color?: string }[],
): { points: { x: number; y: number }[]; repoKey: string; color: string }[] => {
    return scatterPoints.map(({ points, repoKey }, idx) => {
        return { points: points, repoKey: repoKey, color: COLORS[idx % COLORS.length] }
    })
}

export const getRandomScatterPointColor = (): string => {
    return COLORS[Math.floor(Math.random() * COLORS.length)]
}
