import React from 'react'

import { StdMargin } from '@/client/styles'

export const UserCardDivider: React.FC = () => {
    return (
        <hr
            color="rgb(199, 199, 199)"
            style={{ borderColor: 'rgb(69, 169, 69)', backgroundColor: 'rgb(69, 169, 69)' }}
            className={`${StdMargin.T6} ${StdMargin.B6}`}
        />
    )
}
