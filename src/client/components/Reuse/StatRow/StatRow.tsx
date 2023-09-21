import React from 'react'

import { StdColors, StdJustify, StdLayout, StdMargin, StdTextSize, StdWidth } from '@/client/styles'

interface StatCardProps {
    label: string
    value: number | string
}

export const StatRow: React.FC<StatCardProps> = (props) => {
    const { label, value } = props

    return (
        <div className={`${StdLayout.FlexRow} ${StdWidth.Full} ${StdJustify.Between}`}>
            <p className={`${StdTextSize.Large} ${StdColors.Green} ${StdMargin.R60}`}>{value}</p>
            <p>{label}</p>
        </div>
    )
}
