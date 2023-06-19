import styles from './Row.module.css'

import React from 'react'

import DayCell from './DayCell'

import { SHARED_Model__ContributionCalendarDay } from '@/shared/models/models/Contributions'

interface RowProps {
    weekdayName: string
    days: SHARED_Model__ContributionCalendarDay[]
}

export const Row: React.FC<RowProps> = (props) => {
    const { weekdayName, days } = props

    return (
        <div className={styles.row}>
            <p style={{ width: 48 }}>{weekdayName}</p>
            {days.map((day, dayIdx) => {
                return (
                    <div key={`day-cell-${dayIdx}`} style={{ margin: '0 1px' }}>
                        <DayCell day={day} />
                    </div>
                )
            })}
        </div>
    )
}
