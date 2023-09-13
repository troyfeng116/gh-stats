import React, { useState } from 'react'

import { SHARED_Model__ContributionCalendarDay } from '@/shared/models/models/Contributions'
import { formatDateUTC__WWMMMMDYYYY } from '@/shared/utils/dateUtils'

interface DayCellProps {
    day: SHARED_Model__ContributionCalendarDay
    isOnRightSideOfGrid: boolean
}

export const DayCell: React.FC<DayCellProps> = (props) => {
    const { day, isOnRightSideOfGrid } = props
    const { color, contributionCount, contributionLevel, date, weekday } = day

    const [shouldShowCard, setShouldShowCard] = useState<boolean>(false)

    const onMouseEnter = () => {
        setShouldShowCard(true)
    }

    const onMouseLeave = () => {
        setShouldShowCard(false)
    }

    const isInBottomHalfOfGrid = weekday > 3

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
                        left: isOnRightSideOfGrid ? undefined : 0,
                        right: isOnRightSideOfGrid ? 0 : undefined,
                        top: isInBottomHalfOfGrid ? undefined : 18,
                        bottom: isInBottomHalfOfGrid ? 18 : undefined,
                        padding: '3px 6px',
                    }}
                >
                    <p>{formatDateUTC__WWMMMMDYYYY(date)}</p>
                    <p>
                        {contributionCount} contributions ({contributionLevel})
                    </p>
                </div>
            )}
        </div>
    )
}
