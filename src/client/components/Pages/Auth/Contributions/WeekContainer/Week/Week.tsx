import styles from './Week.module.css'

import React from 'react'

import DayCell from './DayCell'

import { SHARED_Model__ContributionCalendarWeek } from '@/shared/models/models/Contributions'

interface WeekProps {
    contributionWeek: SHARED_Model__ContributionCalendarWeek
}

export const Week: React.FC<WeekProps> = (props) => {
    const { contributionWeek } = props
    const { contributionDays } = contributionWeek

    return (
        <div className={styles.contribution_week}>
            {contributionDays.map((day, dayIdx) => {
                return <DayCell key={`day-${dayIdx}`} day={day} />
            })}
        </div>
    )
}
