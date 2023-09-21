import React from 'react'

import { StdMargin, StdWidth } from '@/client/styles'

interface HrDividerProps {
    marginTop?: StdMargin
    marginBottom?: StdMargin
}

export const HrDivider: React.FC<HrDividerProps> = (props) => {
    const { marginTop = StdMargin.T6, marginBottom = StdMargin.B6 } = props

    return (
        <hr
            color="rgb(199, 199, 199)"
            style={{ borderColor: 'rgb(69, 169, 69)', backgroundColor: 'rgb(69, 169, 69)' }}
            className={`${marginTop} ${marginBottom} ${StdWidth.Full}`}
        />
    )
}
