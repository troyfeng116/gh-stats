import styles from './Loading.module.css'

import React from 'react'

import { StdLayout, StdMargin } from '@/client/styles'

interface LoadingProps {
    size?: number
    label?: string
}

export const Loading: React.FC<LoadingProps> = (props) => {
    const { size = 36, label } = props

    return (
        <div className={`${StdLayout.FlexCol}`}>
            <div style={{ height: size, width: size }} className={`${styles.loading}`} />
            {label !== undefined && <p className={`${StdMargin.T12}`}>{label}</p>}
        </div>
    )
}
