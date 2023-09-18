import React from 'react'

import Row from '../Row'

import { StdLayout, StdTextSize } from '@/client/styles'
import { SHARED_Model__ContributionCalendarDay } from '@/shared/models/models/Contributions'
import { SHORT_WEEKDAYS } from '@/shared/utils/weekdayIntToName'

interface MonthGridProps {
    className?: string
    monthAndYear: string
    monthGrid: (SHARED_Model__ContributionCalendarDay | null)[][]
    gridRowHeight: number
}

export const MonthGrid: React.FC<MonthGridProps> = (props) => {
    const { className = '', monthAndYear, monthGrid, gridRowHeight } = props

    return (
        <div className={`${className} ${StdLayout.FlexCol}`}>
            <p className={`${StdTextSize.Label}`} style={{ height: gridRowHeight }}>
                {monthAndYear}
            </p>
            <div>
                {SHORT_WEEKDAYS.map((weekdayName, idx) => {
                    return <Row key={`calendar-grid-row-${idx}`} height={gridRowHeight} days={monthGrid[idx]} />
                })}
            </div>
        </div>
    )
}
