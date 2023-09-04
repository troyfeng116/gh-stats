import styles from './Button.module.css'

import React from 'react'

interface ButtonProps {
    children: React.ReactNode

    onClick?: React.MouseEventHandler<HTMLButtonElement>
}

export const Button: React.FC<ButtonProps> = (props) => {
    const { children, onClick } = props

    return (
        <button className={styles.std_btn} onClick={onClick}>
            {children}
        </button>
    )
}
