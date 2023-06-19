import styles from './CalendarGrid.module.css'

import React from 'react'

import DayCell from './DayCell'

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
            {SHORT_WEEKDAYS.map((weekday, idx) => {
                return (
                    <div key={`calendar-grid-row-${idx}`} className={styles.calendar_grid_row}>
                        <p style={{ width: 48 }}>{weekday}</p>
                        {calendarGrid[idx].map((day, dayIdx) => {
                            return (
                                <div key={`day-cell-${dayIdx}`} style={{ margin: '0 1px' }}>
                                    <DayCell day={day} />
                                </div>
                            )
                        })}
                    </div>
                )
            })}
        </div>
    )
}
