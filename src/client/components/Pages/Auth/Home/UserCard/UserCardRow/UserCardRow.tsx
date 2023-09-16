import styles from './UserCardRow.module.css'

import React from 'react'

interface UserCardRowProps {
    label: string
    value: number
}

export const UserCardRow: React.FC<UserCardRowProps> = (props) => {
    const { label, value } = props

    return (
        <div className={styles.user_card_row}>
            <p style={{ fontSize: 26, color: 'rgb(129, 249, 209)', marginRight: 60 }}>{value}</p>
            <p>{label}</p>
        </div>
    )
}
