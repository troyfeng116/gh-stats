import styles from './WeekContainer.module.css'

import React from 'react'

import Week from './Week'

import { GH_GQL_Schema__ContributionCalendarWeek } from '@/server/lib/gh-gql/Contributions/query'

interface WeekContainerProps {
    weeks: GH_GQL_Schema__ContributionCalendarWeek[]
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
