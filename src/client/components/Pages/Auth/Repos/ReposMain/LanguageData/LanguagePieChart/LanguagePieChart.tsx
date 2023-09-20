import React from 'react'

import PieChart, { PieChartData } from '@/client/components/Reuse/d3/PieChart'
import { SHARED_Model__Language } from '@/shared/models/models/Language'

interface LanguagePieChartProps {
    languageData: SHARED_Model__Language[]
}

export const LanguagePieChart: React.FC<LanguagePieChartProps> = (props) => {
    const { languageData } = props

    const pieChartData: PieChartData[] = languageData.map(({ name, size, color }) => {
        return { label: name, value: size, color: color }
    })

    return <PieChart data={pieChartData} radius={159} />
}
