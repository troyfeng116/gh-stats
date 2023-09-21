import React, { useState } from 'react'
import { FaCaretDown } from 'react-icons/fa'

import { StdCursor, StdLayout } from '@/client/styles'

interface DropdownProps {
    header: React.ReactNode
    headerClassName?: string
    children: React.ReactNode
    className?: string
    shouldInitiallyShowContent?: boolean
}

export const Dropdown: React.FC<DropdownProps> = (props) => {
    const { header, headerClassName = '', children, className = '', shouldInitiallyShowContent = false } = props

    const [shouldShowContent, setShouldShowContent] = useState<boolean>(shouldInitiallyShowContent)

    const handleClick = () => setShouldShowContent((prevShouldShowContent) => !prevShouldShowContent)

    return (
        <div className={`${className}`}>
            <div
                className={`${headerClassName} ${StdLayout.FlexRow} ${StdCursor.Clickable}`}
                style={{ position: 'relative' }}
                onClick={() => handleClick()}
            >
                {header}
                <FaCaretDown
                    size={27}
                    style={{
                        position: 'absolute',
                        top: '50%',
                        right: 18,
                        transform: `translate(0, -50%) rotate(${shouldShowContent ? 180 : 0}deg)`,
                        transition: 'transform 0.3s linear',
                    }}
                />
            </div>
            <div
                style={{
                    maxHeight: shouldShowContent ? 1000 : 0,
                    overflowY: 'hidden',
                    transition: 'max-height 0.3s linear',
                }}
            >
                {children}
            </div>
        </div>
    )
}
