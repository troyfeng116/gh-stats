import React from 'react'

import Row from './Row'

import OverflowScroll from '@/client/components/Reuse/OverflowScroll'
import { StdFlex, StdPadding } from '@/client/styles'
import { SHARED_Model__ContributionCalendarDay } from '@/shared/models/models/Contributions'
import { SHORT_WEEKDAYS } from '@/shared/utils/weekdayIntToName'

interface CalendarGridProps {
    calendarGrid: (SHARED_Model__ContributionCalendarDay | null)[][]
}

export const CalendarGrid: React.FC<CalendarGridProps> = (props) => {
    const { calendarGrid } = props

    return (
        <OverflowScroll className={`${StdFlex.Col} ${StdPadding.B6}`} width={900}>
            {SHORT_WEEKDAYS.map((weekdayName, idx) => {
                return <Row key={`calendar-grid-row-${idx}`} weekdayName={weekdayName} days={calendarGrid[idx]} />
            })}
        </OverflowScroll>
    )
}
