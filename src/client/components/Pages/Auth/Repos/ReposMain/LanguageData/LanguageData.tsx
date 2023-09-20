import React from 'react'

import LanguageBarChart from './LanguageBarChart'
import LanguageLegend from './LanguageLegend'
import LanguagePieChart from './LanguagePieChart'

import { SHARED_Model__Language } from '@/shared/models/models/Language'

interface LanguageDataProps {
    languageData: SHARED_Model__Language[]
    shouldSortMostFirst?: boolean
}

export const LanguageData: React.FC<LanguageDataProps> = (props) => {
    const { languageData, shouldSortMostFirst = true } = props

    if (languageData.length === 0) {
        return null
    }

    const languageDataCopy: SHARED_Model__Language[] = JSON.parse(JSON.stringify(languageData))

    if (shouldSortMostFirst) {
        languageDataCopy.sort((a, b) => b.size - a.size)
    }

    const totalLanguageBytes = languageDataCopy.reduce((totalPrev, { size }) => totalPrev + size, 0)

    return (
        <div>
            <LanguageLegend totalLanguageBytes={totalLanguageBytes} languageData={languageDataCopy} />
            <LanguagePieChart totalLanguageBytes={totalLanguageBytes} languageData={languageDataCopy} />
            <LanguageBarChart languageData={languageDataCopy} />
        </div>
    )
}
