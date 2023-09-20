import styles from './Button.module.css'

import React from 'react'

interface ButtonProps {
    children: React.ReactNode
    disabled?: boolean
    className?: string

    onClick?: React.MouseEventHandler<HTMLButtonElement>
}

export const Button: React.FC<ButtonProps> = (props) => {
    const { children, disabled, className = '', onClick } = props

    return (
        <button className={`${styles.std_btn} ${className}`} disabled={disabled} onClick={onClick}>
            {children}
        </button>
    )
}
