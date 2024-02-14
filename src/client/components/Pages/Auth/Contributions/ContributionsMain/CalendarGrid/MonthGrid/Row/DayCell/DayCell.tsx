import React, { useState } from 'react'

import { StdBgColors, StdColors, StdFonts, StdPadding } from '@/client/styles'
import { SHARED_Model__ContributionCalendarDay } from '@/shared/models/models/Contributions'
import { formatDateUTC__MDYY } from '@/shared/utils/dateUtils'

interface DayCellProps {
    day: SHARED_Model__ContributionCalendarDay
    tooltipPosition: React.CSSProperties
}

export const DayCell: React.FC<DayCellProps> = (props) => {
    const { day } = props
    const { color, contributionCount, date } = day

    const [shouldShowCard, setShouldShowCard] = useState<boolean>(false)
    const [tooltipPosition, setTooltipPosition] = useState<React.CSSProperties>({})

    const onMouseEnter: React.MouseEventHandler<HTMLDivElement> = (e) => {
        setShouldShowCard(true)
        setTooltipPosition({
            top: e.pageY,
            left: e.pageX,
        })
    }

    const onMouseLeave = () => {
        setShouldShowCard(false)
        setTooltipPosition({})
    }

    return (
        <div>
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
                    className={`${StdFonts.Secondary} ${StdBgColors.White} ${StdColors.Black} ${StdPadding.All12}`}
                    style={{
                        ...tooltipPosition,
                        zIndex: 1,
                        whiteSpace: 'nowrap',
                        position: 'absolute',
                        transform: 'translate(-50%, 18px)',
                        textAlign: 'center',
                        borderRadius: 6,
                    }}
                >
                    <p>{formatDateUTC__MDYY(date)}</p>
                    <p>{contributionCount} contributions</p>
                </div>
            )}
        </div>
    )
}
