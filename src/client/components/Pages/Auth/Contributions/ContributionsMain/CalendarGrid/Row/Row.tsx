import styles from './Row.module.css'

import React from 'react'

import DayCell from './DayCell'

import { SHARED_Model__ContributionCalendarDay } from '@/shared/models/models/Contributions'

interface RowProps {
    weekdayName: string
    days: (SHARED_Model__ContributionCalendarDay | null)[]
}

export const Row: React.FC<RowProps> = (props) => {
    const { weekdayName, days } = props

    return (
        <div className={styles.row}>
            <p style={{ minWidth: 48, maxWidth: 48 }}>{weekdayName}</p>
            {days.map((day, dayIdx) => {
                if (day === null) {
                    return (
                        <div
                            key={`day-cell-${dayIdx}`}
                            style={{ height: 12, minWidth: 12, maxWidth: 12, margin: '0 1px' }}
                        ></div>
                    )
                }
                return (
                    <div key={`day-cell-${dayIdx}`} style={{ margin: '0 1px' }}>
                        <DayCell day={day} isOnRightSideOfGrid={dayIdx > days.length / 2} />
                    </div>
                )
            })}
        </div>
    )
}
