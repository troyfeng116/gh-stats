import React from 'react'

import { StdLayout, StdMargin } from '@/client/styles'
import { InlineColors } from '@/client/styles/inline'

interface ToggleProps {
    label?: React.ReactNode
    id?: string
    isToggleOn: boolean

    handleToggle: () => void
}

export const Toggle: React.FC<ToggleProps> = (props) => {
    const { label, isToggleOn, id, handleToggle } = props

    return (
        <div className={`${StdLayout.FlexRow}`}>
            <label>
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
                        borderRadius: 13,
                        width: 48,
                        height: 26,
                        position: 'relative',
                        transition: 'background 0.2s linear',
                    }}
                >
                    <div
                        style={{
                            backgroundColor: 'white',
                            width: 20,
                            height: 20,
                            borderRadius: 10,
                            position: 'absolute',
                            top: 3,
                            left: isToggleOn ? 3 : 48 - 3 - 22,
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
