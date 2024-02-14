import React from 'react'

import DayCell from './DayCell'

import { StdLayout } from '@/client/styles'
import { SHARED_Model__ContributionCalendarDay } from '@/shared/models/models/Contributions'

interface RowProps {
    height: number
    days: (SHARED_Model__ContributionCalendarDay | null)[]
}

export const Row: React.FC<RowProps> = (props) => {
    const { height, days } = props

    return (
        <div className={`${StdLayout.FlexRow}`} style={{ height: height }}>
            {days.map((day, dayIdx) => {
                if (day === null) {
                    return (
                        <div
                            key={`day-cell-${dayIdx}`}
                            style={{ height: 12, minWidth: 12, maxWidth: 12, margin: '0 1px' }}
                        />
                    )
                }

                return (
                    <div key={`day-cell-${dayIdx}`} style={{ margin: '0 1px' }}>
                        <DayCell day={day} />
                    </div>
                )
            })}
        </div>
    )
}
