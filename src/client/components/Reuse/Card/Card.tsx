import React, { CSSProperties } from 'react'

import { StdPadding } from '@/client/styles'

export enum CardType {
    Primary = 'Primary',
    Secondary = 'Secondary',
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
            borderStyle = { border: '3px solid rgb(129, 249, 209)', borderRadius: '6px' }
            break
        case CardType.Secondary:
            borderStyle = { border: '2px solid rgb(139, 139, 139)', borderRadius: '3px' }
    }

    const paddingStr = typeof padding == 'string' ? padding : padding.join(' ')

    return (
        <div className={`${className} ${paddingStr}`} style={{ ...style, ...borderStyle }}>
            {children}
        </div>
    )
}
