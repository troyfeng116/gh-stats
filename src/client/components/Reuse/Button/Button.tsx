import styles from './Button.module.css'

import React from 'react'

interface ButtonProps {
    children: React.ReactNode
    disabled?: boolean
    className?: string
    style?: React.CSSProperties

    onClick?: React.MouseEventHandler<HTMLButtonElement>
}

export const Button: React.FC<ButtonProps> = (props) => {
    const { children, disabled, className = '', style = {}, onClick } = props

    return (
        <button className={`${styles.std_btn} ${className}`} style={{ ...style }} disabled={disabled} onClick={onClick}>
            {children}
        </button>
    )
}
