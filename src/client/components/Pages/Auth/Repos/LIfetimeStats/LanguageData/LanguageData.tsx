import React from 'react'

interface LanguageDataProps {
    languageData: { size: number; color: string; name: string }[]
    shouldShowBytes?: boolean
}

export const LanguageData: React.FC<LanguageDataProps> = (props) => {
    const { languageData, shouldShowBytes = true } = props

    let totalLanguageBytes = 0
    for (let i = 0; i < languageData.length; i++) {
        const { size } = languageData[i]
        totalLanguageBytes += size
    }

    return (
        <div>
            {languageData.map((language, idx) => {
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
