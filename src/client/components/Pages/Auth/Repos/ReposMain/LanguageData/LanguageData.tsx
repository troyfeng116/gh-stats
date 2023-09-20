import React from 'react'

import LanguageInfo from './LanguageInfo'

import PieChart from '@/client/components/Reuse/d3/PieChart'
import { SHARED_Model__Language } from '@/shared/models/models/Language'

interface LanguageDataProps {
    languageData: SHARED_Model__Language[]
    shouldShowBytes?: boolean
    shouldSortMostFirst?: boolean
}

export const LanguageData: React.FC<LanguageDataProps> = (props) => {
    const { languageData, shouldShowBytes = true, shouldSortMostFirst = true } = props

    if (languageData.length === 0) {
        return null
    }

    const languageDataCopy: SHARED_Model__Language[] = JSON.parse(JSON.stringify(languageData))

    if (shouldSortMostFirst) {
        languageDataCopy.sort((a, b) => b.size - a.size)
    }

    let totalLanguageBytes = 0
    for (let i = 0; i < languageDataCopy.length; i++) {
        const { size } = languageDataCopy[i]
        totalLanguageBytes += size
    }

    const pieChartData: { label: string; value: number; color?: string }[] = languageDataCopy.map(
        ({ name, size, color }) => {
            return { label: name, value: size, color: color }
        },
    )

    return (
        <div>
            {languageDataCopy.map((language, idx) => {
                const { name } = language
                return (
                    <LanguageInfo
                        key={`${name}-${idx}`}
                        language={language}
                        totalBytes={totalLanguageBytes}
                        shouldShowBytes={shouldShowBytes}
                    />
                )
            })}
            <PieChart data={pieChartData} radius={159} />
        </div>
    )
}
