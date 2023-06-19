import styles from './LanguageInfo.module.css'

import React from 'react'

import { SHARED_Model__Language } from '@/shared/models/models/Language'
import { bytesToStr } from '@/shared/utils/toBytesStr'
import { toPercent } from '@/shared/utils/toPercent'

interface LanguageInfoProps {
    language: SHARED_Model__Language
    totalBytes: number
    shouldShowBytes: boolean
}

export const LanguageInfo: React.FC<LanguageInfoProps> = (props) => {
    const { language, totalBytes, shouldShowBytes } = props
    const { size, color, name } = language

    return (
        <div className={styles.lang_container}>
            <div className={styles.lang_dot} style={{ backgroundColor: color }}></div>
            <p>
                {name} ({toPercent(size, totalBytes)}%{shouldShowBytes && `, ${bytesToStr(size, 2)}`})
            </p>
        </div>
    )
}
