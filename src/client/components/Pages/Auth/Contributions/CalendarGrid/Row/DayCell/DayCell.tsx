import React, { useState } from 'react'

import { SHARED_Model__ContributionCalendarDay } from '@/shared/models/models/Contributions'

interface DayCellProps {
    day: SHARED_Model__ContributionCalendarDay
}

export const DayCell: React.FC<DayCellProps> = (props) => {
    const { day } = props
    const { color, contributionCount, contributionLevel, date } = day

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
                        top: 18,
                        padding: '3px 6px',
                    }}
                >
                    <p>
                        {new Date(date).toLocaleDateString(undefined, {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            weekday: 'long',
                            timeZone: 'UTC',
                        })}
                    </p>
                    <p>
                        {contributionCount} contributions ({contributionLevel})
                    </p>
                </div>
            )}
        </div>
    )
}
