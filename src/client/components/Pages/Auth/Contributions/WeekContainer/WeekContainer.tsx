import styles from './WeekContainer.module.css'

import React from 'react'

import Week from './Week'

import { SHARED_Model__ContributionCalendarWeek } from '@/shared/models/models/Contributions'

interface WeekContainerProps {
    weeks: SHARED_Model__ContributionCalendarWeek[]
}

export const WeekContainer: React.FC<WeekContainerProps> = (props) => {
    const { weeks } = props

    return (
        <div className={styles.week_container}>
            {weeks.map((week, weekIdx) => (
                <Week key={`week-${weekIdx}`} contributionWeek={week} />
            ))}
        </div>
    )
}
