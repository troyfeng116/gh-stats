import React from 'react'

import PieChart, { PieChartData } from '@/client/components/Reuse/d3/PieChart'
import { SHARED_Model__Language } from '@/shared/models/models/Language'
import { bytesToStr } from '@/shared/utils/toBytesStr'
import { toPercent } from '@/shared/utils/toPercent'

interface LanguagePieChartProps {
    title?: string
    totalLanguageBytes: number
    languageData: SHARED_Model__Language[]
}

export const LanguagePieChart: React.FC<LanguagePieChartProps> = (props) => {
    const { title, totalLanguageBytes, languageData } = props

    const pieChartData: PieChartData[] = languageData.map(({ name, size, color, approxLoc }) => {
        return {
            label: `${name} (${toPercent(size, totalLanguageBytes)}%, ${bytesToStr(size, 0)}, ≈${approxLoc} lines)`,
            value: size,
            color: color,
        }
    })

    return <PieChart title={title} data={pieChartData} radius={159} />
}
