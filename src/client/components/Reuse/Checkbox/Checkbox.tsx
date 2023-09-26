import React from 'react'
import { FaCheck } from 'react-icons/fa'

import { StdLayout, StdMargin } from '@/client/styles'
import { InlineColors } from '@/client/styles/inline'

interface CheckboxProps {
    label?: React.ReactNode
    id?: string
    isChecked: boolean
    className?: string

    handleChecked: () => void
}

export const Checkbox: React.FC<CheckboxProps> = (props) => {
    const { label, isChecked, id, className = '', handleChecked } = props

    return (
        <div className={`${className} ${StdLayout.FlexRow}`}>
            <label>
                <input
                    id={id}
                    type="checkbox"
                    checked={isChecked}
                    onChange={handleChecked}
                    style={{ display: 'none' }}
                />
                <div
                    className={`${StdLayout.FlexColCenter}`}
                    style={{
                        backgroundColor: isChecked ? InlineColors.PrimaryGreen : InlineColors.DarkGray,
                        borderRadius: 5,
                        height: 16,
                        width: 16,
                    }}
                >
                    {isChecked && <FaCheck size={12} style={{ color: 'black' }} />}
                </div>
            </label>
            {label !== undefined && (
                <label htmlFor={id} className={`${StdMargin.L6}`}>
                    {label}
                </label>
            )}
        </div>
    )
}
