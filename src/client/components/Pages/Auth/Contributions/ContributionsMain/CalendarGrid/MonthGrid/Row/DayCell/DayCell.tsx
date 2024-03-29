import React, { useState } from 'react'

import { StdFonts } from '@/client/styles'
import { SHARED_Model__ContributionCalendarDay } from '@/shared/models/models/Contributions'
import { formatDateUTC__MDYY } from '@/shared/utils/dateUtils'

interface DayCellProps {
    day: SHARED_Model__ContributionCalendarDay
    tooltipPosition: React.CSSProperties
}

export const DayCell: React.FC<DayCellProps> = (props) => {
    const { day, tooltipPosition } = props
    const { color, contributionCount, date } = day

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
                    className={`${StdFonts.Secondary}`}
                    style={{
                        ...tooltipPosition,
                        zIndex: 1,
                        whiteSpace: 'nowrap',
                        backgroundColor: 'white',
                        color: 'black',
                        position: 'absolute',
                        padding: '3px 6px',
                        textAlign: 'center',
                    }}
                >
                    <p>{formatDateUTC__MDYY(date)}</p>
                    <p>{contributionCount} contributions</p>
                </div>
            )}
        </div>
    )
}
