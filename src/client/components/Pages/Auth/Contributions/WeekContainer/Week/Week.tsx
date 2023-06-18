import styles from './Week.module.css'

import React from 'react'

import DayCell from './DayCell'

import { GH_GQL_Schema__ContributionCalendarWeek } from '@/server/lib/gh-gql/Contributions/query'

interface WeekProps {
    contributionWeek: GH_GQL_Schema__ContributionCalendarWeek
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
