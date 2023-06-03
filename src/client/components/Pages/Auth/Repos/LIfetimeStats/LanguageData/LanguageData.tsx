import React from 'react'

interface LanguageDataProps {
    languageData: { size: number; color: string; name: string }[]
    shouldShowBytes?: boolean
    shouldSortMostFirst?: boolean
}

export const LanguageData: React.FC<LanguageDataProps> = (props) => {
    const { languageData, shouldShowBytes = true, shouldSortMostFirst = true } = props

    if (languageData.length === 0) {
        return null
    }

    const languageDataCopy: {
        size: number
        color: string
        name: string
    }[] = JSON.parse(JSON.stringify(languageData))

    if (shouldSortMostFirst) {
        languageDataCopy.sort((a, b) => b.size - a.size)
    }

    let totalLanguageBytes = 0
    for (let i = 0; i < languageDataCopy.length; i++) {
        const { size } = languageDataCopy[i]
        totalLanguageBytes += size
    }

    return (
        <div>
            {languageDataCopy.map((language, idx) => {
                const { size, color, name } = language
                return (
                    <p key={`${name}-${idx}`} style={{ color: color }}>
                        {name} ({((size / totalLanguageBytes) * 100).toFixed(2)}%{shouldShowBytes && `, ${size} bytes`})
                    </p>
                )
            })}
        </div>
    )
}
