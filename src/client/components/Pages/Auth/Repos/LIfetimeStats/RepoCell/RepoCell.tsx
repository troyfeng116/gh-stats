import React from 'react'

import { SHARED_Model__RepoWithCommitCountsAndLanguagesAndLineInfo } from '@/shared/models'

interface RepoCellProps {
    repo: SHARED_Model__RepoWithCommitCountsAndLanguagesAndLineInfo
}

export const RepoCell: React.FC<RepoCellProps> = (props) => {
    const { repo } = props
    const {
        name,
        owner: { login },
        totalCount: repoCommitCount,
        languageData,
        diskUsage,
        lineInfo,
    } = repo

    const { numLines, numAdditions, numDeletions } = lineInfo
    let changesStr: string | undefined = undefined
    if (numAdditions !== undefined && numDeletions !== undefined) {
        changesStr = `(${numAdditions} additions - ${numDeletions} deletions)`
    }

    let totalLanguageBytes = 0
    for (let i = 0; i < languageData.length; i++) {
        const { size } = languageData[i]
        totalLanguageBytes += size
    }

    return (
        <div>
            <h4>
                {login}/{name}
            </h4>
            <p>disk usage: {diskUsage}</p>
            <p>{repoCommitCount} commits</p>
            <p>
                {numLines} lines of code contributed{changesStr !== undefined && changesStr}
            </p>
            {languageData.map((language, idx) => {
                const { size, color, name } = language
                return (
                    <p key={`${name}-${idx}`} style={{ color: color }}>
                        {name} ({((size / totalLanguageBytes) * 100).toFixed(2)}%)
                    </p>
                )
            })}
        </div>
    )
}
