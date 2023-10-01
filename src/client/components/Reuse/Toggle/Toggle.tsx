import React from 'react'

import { StdCursor, StdLayout, StdMargin } from '@/client/styles'
import { InlineColors } from '@/client/styles/inline'

interface ToggleProps {
    label?: React.ReactNode
    id?: string
    isToggleOn: boolean

    handleToggle: () => void
}

export const Toggle: React.FC<ToggleProps> = (props) => {
    const { label, isToggleOn, id, handleToggle } = props

    const bgWidth = 48,
        bgHeight = 26
    const toggleSize = 20
    const bgPadding = (bgHeight - toggleSize) / 2

    return (
        <div className={`${StdLayout.FlexRow}`}>
            <label className={`${StdCursor.Clickable}`}>
                <input
                    id={id}
                    type="checkbox"
                    checked={isToggleOn}
                    onChange={handleToggle}
                    style={{ display: 'none' }}
                />
                <div
                    className={`${StdLayout.FlexRow}`}
                    style={{
                        backgroundColor: isToggleOn ? InlineColors.PrimaryGreen : InlineColors.DarkGray,
                        borderRadius: bgHeight / 2,
                        width: bgWidth,
                        height: bgHeight,
                        position: 'relative',
                        transition: 'background 0.2s linear',
                    }}
                >
                    <div
                        style={{
                            backgroundColor: 'white',
                            width: toggleSize,
                            height: toggleSize,
                            borderRadius: toggleSize / 2,
                            position: 'absolute',
                            top: bgPadding,
                            left: isToggleOn ? bgPadding : bgWidth - bgPadding - toggleSize,
                            transition: 'left 0.2s linear',
                        }}
                    />
                </div>
            </label>
            {label !== undefined && (
                <label htmlFor={id} className={`${StdMargin.L12}`}>
                    {label}
                </label>
            )}
        </div>
    )
}
