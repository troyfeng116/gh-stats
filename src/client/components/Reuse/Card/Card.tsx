import React, { CSSProperties } from 'react'

import { StdPadding } from '@/client/styles'
import { InlineColors } from '@/client/styles/inline'

export enum CardType {
    Primary = 'Primary',
    Secondary = 'Secondary',
    Tertiary = 'Tertiary',
}

interface CardProps {
    children: React.ReactNode
    type?: CardType
    padding?: StdPadding | StdPadding[]
    className?: string
    style?: CSSProperties
}

export const Card: React.FC<CardProps> = (props) => {
    const { type = CardType.Primary, children, padding = StdPadding.All24, className = '', style } = props

    let borderStyle: React.CSSProperties = {}
    switch (type) {
        case CardType.Primary:
            borderStyle = { border: `3px solid ${InlineColors.PrimaryGreen}`, borderRadius: 12 }
            break
        case CardType.Secondary:
            borderStyle = { border: `2px solid ${InlineColors.DarkGray}`, borderRadius: 12 }
            break
        case CardType.Tertiary:
            borderStyle = {
                backgroundColor: `${InlineColors.TertiaryCardBgDarkGray}`,
                borderRadius: 12,
            }
    }

    const paddingStr = typeof padding == 'string' ? padding : padding.join(' ')

    return (
        <div className={`${className} ${paddingStr}`} style={{ ...style, ...borderStyle }}>
            {children}
        </div>
    )
}
