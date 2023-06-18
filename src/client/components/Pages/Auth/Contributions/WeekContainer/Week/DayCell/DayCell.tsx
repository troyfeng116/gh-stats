import React, { useState } from 'react'

import { GH_GQL_Schema__ContributionCalendarDay } from '@/server/lib/gh-gql/Contributions/query'
import { weekdayIntToName } from '@/shared/utils/weekdayIntToName'

interface DayCellProps {
    day: GH_GQL_Schema__ContributionCalendarDay
}

export const DayCell: React.FC<DayCellProps> = (props) => {
    const { day } = props
    const { color, contributionCount, contributionLevel, date, weekday } = day

    const [shouldShowCard, setShouldShowCard] = useState<boolean>(false)

    const onMouseEnter = () => {
        setShouldShowCard(true)
    }

    const onMouseLeave = () => {
        setShouldShowCard(false)
    }

    return (
        <div
            style={{
                position: 'relative',
                margin: 1,
            }}
        >
            <div
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                style={{
                    backgroundColor: color,
                    width: 12,
                    height: 12,
                    borderRadius: 3,
                }}
            ></div>
            {shouldShowCard && (
                <div
                    style={{
                        zIndex: 1,
                        whiteSpace: 'nowrap',
                        backgroundColor: 'white',
                        color: 'black',
                        position: 'absolute',
                        left: -24,
                    }}
                >
                    <p>
                        {weekdayIntToName(weekday)} {new Date(date).toLocaleDateString()}
                    </p>
                    <p>
                        {contributionCount} contributions ({contributionLevel})
                    </p>
                </div>
            )}
        </div>
    )
}
