import React from 'react'

interface OverflowScrollProps {
    className?: string
    width: number
    children: React.ReactNode
}

export const OverflowScroll: React.FC<OverflowScrollProps> = (props) => {
    const { className, width, children } = props

    return (
        <div className={className} style={{ maxWidth: width, overflowX: 'auto' }}>
            {children}
        </div>
    )
}
