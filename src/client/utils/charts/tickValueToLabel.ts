import { formatDate } from '@/shared/utils/dateUtils'

export const tickValueToDateLabel = (tickValue: number) => {
    return formatDate(
        tickValue,
        {
            year: '2-digit',
            month: 'numeric',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
        },
        true,
    )
}

export const tickValueToMonthAndYearLabel = (tickValue: number) => {
    return formatDate(
        tickValue,
        {
            year: 'numeric',
            month: 'short',
        },
        true,
    )
}
