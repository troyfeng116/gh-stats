import React from 'react'
import { FaCheck } from 'react-icons/fa'

import { StdLayout, StdMargin } from '@/client/styles'

interface CheckboxProps {
    label?: React.ReactNode
    id?: string
    isChecked: boolean

    handleChecked: () => void
}

export const Checkbox: React.FC<CheckboxProps> = (props) => {
    const { label, isChecked, id, handleChecked } = props

    return (
        <div className={`${StdLayout.FlexRow}`}>
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
                        backgroundColor: isChecked ? 'rgb(109, 229, 189)' : 'rgb(139, 139, 139)',
                        borderRadius: 5,
                        height: 16,
                        width: 16,
                    }}
                >
                    {isChecked && <FaCheck size={12} style={{ color: 'black' }} />}
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
