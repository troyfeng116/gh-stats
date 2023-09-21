import React from 'react'

import MonthGrid from './MonthGrid'

import OverflowScroll from '@/client/components/Reuse/OverflowScroll'
import { StdAlign, StdFlex, StdLayout, StdMargin, StdPadding, StdTextSize } from '@/client/styles'
import { SHARED_Model__ContributionCalendarDay } from '@/shared/models/models/Contributions'
import { SHORT_WEEKDAYS } from '@/shared/utils/weekdayIntToName'

interface CalendarGridProps {
    calendarGridByMonthAndYear: { monthAndYear: string; grid: (SHARED_Model__ContributionCalendarDay | null)[][] }[]
}

export const CalendarGrid: React.FC<CalendarGridProps> = (props) => {
    const { calendarGridByMonthAndYear } = props

    const gridRowHeight = 16

    return (
        <OverflowScroll className={`${StdFlex.Row} ${StdPadding.B6}`} width={900}>
            <div className={`${StdFlex.Col} ${StdAlign.End} ${StdMargin.R18}`}>
                <div style={{ height: gridRowHeight }}></div>
                {SHORT_WEEKDAYS.map((weekdayName, idx) => {
                    return (
                        <p
                            key={`calendar-grid-weekday-name-${idx}`}
                            className={`${StdTextSize.Label} ${StdLayout.FlexRow}`}
                            style={{ height: gridRowHeight }}
                        >
                            {weekdayName}
                        </p>
                    )
                })}
            </div>

            {calendarGridByMonthAndYear.map(({ monthAndYear, grid }, idx) => {
                return (
                    <MonthGrid
                        key={`calendar-grid-month-${idx}`}
                        className={`${StdMargin.R6}`}
                        monthAndYear={monthAndYear}
                        monthGrid={grid}
                        gridRowHeight={gridRowHeight}
                    />
                )
            })}
        </OverflowScroll>
    )
}
