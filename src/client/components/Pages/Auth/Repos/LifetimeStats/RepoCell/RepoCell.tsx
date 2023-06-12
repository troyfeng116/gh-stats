import styles from './RepoCell.module.css'

import React from 'react'

import LanguageData from '../LanguageData'

import { SHARED_Model__RepoWithCommitCountsAndLanguages } from '@/shared/models/models/Repos'
import { kbToStr } from '@/shared/utils/toBytesStr'

interface RepoCellProps {
    repo: SHARED_Model__RepoWithCommitCountsAndLanguages
}

export const RepoCell: React.FC<RepoCellProps> = (props) => {
    const { repo } = props
    const {
        name,
        owner: { login },
        totalCount: repoCommitCount,
        languageData,
        diskUsage,
    } = repo

    // const changesStr: string | undefined = undefined

    return (
        <div className={styles.card}>
            <h4>
                {login}/{name}
            </h4>
            <p>repo disk usage: {kbToStr(diskUsage)}</p>
            <p>{repoCommitCount} commits</p>
            {/* <p>
                {numLines} lines of code contributed{changesStr !== undefined && ` ${changesStr}`}
            </p> */}
            <div>
                <LanguageData languageData={languageData} />
            </div>
        </div>
    )
}
