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

    const repoKey = `${login}/${name}`

    return (
        <div className={styles.card}>
            <p>{repoKey}</p>
            <p>repo disk usage: {kbToStr(diskUsage)}</p>
            <p>{repoCommitCount} commits</p>
            <div>
                <LanguageData title={repoKey} languageData={languageData} />
            </div>
        </div>
    )
}
