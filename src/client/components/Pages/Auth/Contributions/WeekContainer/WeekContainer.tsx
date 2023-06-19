import styles from './WeekContainer.module.css'

import React from 'react'

import DayCell from './Week/DayCell'

import { weeksToCalendarGrid } from '@/client/utils/weeksToCalendarGrid'
import { SHARED_Model__ContributionCalendarWeek } from '@/shared/models/models/Contributions'
import { SHORT_WEEKDAYS } from '@/shared/utils/weekdayIntToName'

interface WeekContainerProps {
    weeks: SHARED_Model__ContributionCalendarWeek[]
}

export const WeekContainer: React.FC<WeekContainerProps> = (props) => {
    const { weeks } = props

    const calendarGrid = weeksToCalendarGrid(weeks)

    return (
        <div className={styles.week_container}>
            {SHORT_WEEKDAYS.map((weekday, idx) => {
                return (
                    <div key={`calendar-grid-row-${idx}`} className={styles.week_container_row}>
                        <p style={{ width: 48 }}>{weekday}</p>
                        {calendarGrid[idx].map((day, dayIdx) => {
                            return <DayCell key={`day-cell-${dayIdx}`} day={day} />
                        })}
                    </div>
                )
            })}
        </div>
    )
}
