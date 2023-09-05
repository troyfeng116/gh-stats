import styles from './CalendarGrid.module.css'

import React from 'react'

import Row from './Row'

import { weeksToCalendarGrid } from '@/client/utils/weeksToCalendarGrid'
import { SHARED_Model__ContributionCalendarWeek } from '@/shared/models/models/Contributions'
import { SHORT_WEEKDAYS } from '@/shared/utils/weekdayIntToName'

interface CalendarGridProps {
    weeks: SHARED_Model__ContributionCalendarWeek[]
}

export const CalendarGrid: React.FC<CalendarGridProps> = (props) => {
    const { weeks } = props

    const calendarGrid = weeksToCalendarGrid(weeks)

    return (
        <div className={styles.calendar_grid}>
            {SHORT_WEEKDAYS.map((weekdayName, idx) => {
                return <Row key={`calendar-grid-row-${idx}`} weekdayName={weekdayName} days={calendarGrid[idx]} />
            })}
        </div>
    )
}
