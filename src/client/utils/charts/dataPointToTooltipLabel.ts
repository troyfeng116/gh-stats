import { formatDate } from '@/shared/utils/dateUtils'

export const dataToContributionsDateMapping = (dataPoint: { x: number; y: number }) => {
    const { x, y } = dataPoint
    return `${new Date(x).toLocaleDateString()}: ${y} contributions`
}

export const dataToContributionsMonthAndYearMapping = (dataPoint: { x: number; y: number }) => {
    const { x, y } = dataPoint
    return `${formatDate(x, { year: 'numeric', month: 'short' }, true)}: ${y} contributions`
}
