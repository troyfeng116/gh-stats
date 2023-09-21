import React from 'react'

import { StdLayout } from '@/client/styles'

export interface LegendData {
    label: string
    color: string
    onMouseEnter?: React.MouseEventHandler<Element>
    onMouseLeave?: React.MouseEventHandler<Element>
}

interface LegendProps {
    legendData: LegendData[]
}

export const Legend: React.FC<LegendProps> = (props) => {
    const { legendData } = props

    return (
        <div>
            {legendData.map(({ label, color, onMouseEnter, onMouseLeave }, idx) => {
                return (
                    <div
                        key={`legend-${label}-${idx}`}
                        className={`${StdLayout.FlexRow}`}
                        onMouseEnter={onMouseEnter}
                        onMouseLeave={onMouseLeave}
                    >
                        <div
                            style={{
                                backgroundColor: color,
                                height: 12,
                                width: 12,
                                borderRadius: '50%',
                                marginRight: 9,
                            }}
                        />
                        <p>{label}</p>
                    </div>
                )
            })}
        </div>
    )
}
