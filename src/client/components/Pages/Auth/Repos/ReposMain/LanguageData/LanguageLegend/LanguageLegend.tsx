import React from 'react'

import Legend, { LegendData } from '@/client/components/Reuse/Legend'
import { SHARED_Model__Language } from '@/shared/models/models/Language'
import { bytesToStr } from '@/shared/utils/toBytesStr'
import { toPercent } from '@/shared/utils/toPercent'

interface LanguageLegendProps {
    totalLanguageBytes: number
    languageData: SHARED_Model__Language[]
}

export const LanguageLegend: React.FC<LanguageLegendProps> = (props) => {
    const { totalLanguageBytes, languageData } = props

    const legendData: LegendData[] = languageData.map(({ name, color, size, approxLoc }) => {
        return {
            label: `${name} (${toPercent(size, totalLanguageBytes)}%, ${bytesToStr(size, 2)}, ≈${approxLoc} lines)`,
            color: color,
        }
    })

    return <Legend legendData={legendData} />
}
