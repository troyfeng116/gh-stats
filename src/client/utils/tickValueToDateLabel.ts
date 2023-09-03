export const tickValueToDateLabel = (tickValue: number) => {
    return new Date(tickValue).toLocaleDateString(undefined, {
        year: '2-digit',
        month: 'numeric',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    })
}
