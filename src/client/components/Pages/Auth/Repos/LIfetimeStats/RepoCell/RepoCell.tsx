import React from 'react'

import LanguageData from '../LanguageData'

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
        changesStr = `(+${numAdditions}, -${numDeletions})`
    }

    return (
        <div>
            <h4>
                {login}/{name}
            </h4>
            <p>repo disk usage: {diskUsage}KB</p>
            <p>{repoCommitCount} commits</p>
            <p>
                {numLines} lines of code contributed{changesStr !== undefined && ` ${changesStr}`}
            </p>
            <div>
                <LanguageData languageData={languageData} />
            </div>
        </div>
    )
}
