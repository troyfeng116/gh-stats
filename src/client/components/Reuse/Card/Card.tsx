import React, { CSSProperties } from 'react'

interface CardProps {
    children: React.ReactNode
    className?: string
    style?: CSSProperties
}

export const Card: React.FC<CardProps> = (props) => {
    const { children, className, style } = props

    return (
        <div className={className} style={{ ...style, border: '2px solid rgb(129, 249, 209)', borderRadius: '6px' }}>
            {children}
        </div>
    )
}
