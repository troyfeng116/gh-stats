import styles from './Button.module.css'

import React from 'react'

interface ButtonProps {
    children: React.ReactNode
    disabled?: boolean

    onClick?: React.MouseEventHandler<HTMLButtonElement>
}

export const Button: React.FC<ButtonProps> = (props) => {
    const { children, disabled, onClick } = props

    return (
        <button className={styles.std_btn} disabled={disabled} onClick={onClick}>
            {children}
        </button>
    )
}
