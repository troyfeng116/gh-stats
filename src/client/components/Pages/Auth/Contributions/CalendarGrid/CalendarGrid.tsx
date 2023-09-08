import styles from './CalendarGrid.module.css'

import React from 'react'

import Row from './Row'

import { SHARED_Model__ContributionCalendarDay } from '@/shared/models/models/Contributions'
import { SHORT_WEEKDAYS } from '@/shared/utils/weekdayIntToName'

interface CalendarGridProps {
    calendarGrid: (SHARED_Model__ContributionCalendarDay | null)[][]
}

export const CalendarGrid: React.FC<CalendarGridProps> = (props) => {
    const { calendarGrid } = props

    return (
        <div className={styles.calendar_grid}>
            {SHORT_WEEKDAYS.map((weekdayName, idx) => {
                return <Row key={`calendar-grid-row-${idx}`} weekdayName={weekdayName} days={calendarGrid[idx]} />
            })}
        </div>
    )
}
