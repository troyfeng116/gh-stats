import React, { useRef } from 'react'

import LanguageData from '../LanguageData'

import Dropdown from '@/client/components/Reuse/Dropdown'
import { StdColors, StdLayout, StdMargin, StdTextSize } from '@/client/styles'
import { SHARED_Model__RepoWithCommitCountsAndLanguages } from '@/shared/models/models/Repos'
import { kbToStr } from '@/shared/utils/toBytesStr'

interface RepoDropdownProps {
    repo: SHARED_Model__RepoWithCommitCountsAndLanguages
}

export const RepoDropdown: React.FC<RepoDropdownProps> = (props) => {
    const contentRef = useRef<HTMLDivElement>(null)

    const { repo } = props
    const {
        name,
        owner: { login },
        diskUsage,
        totalCount,
        languageData,
    } = repo
    const repoKey = `${login}/${name}`

    const contentHeight = contentRef.current === null ? undefined : contentRef.current.clientHeight

    return (
        <Dropdown
            header={<h3 className={`${StdTextSize.Medium}`}>{repoKey}</h3>}
            headerClassName={`${StdLayout.FlexRowCenter}`}
            contentHeight={contentHeight}
        >
            <div ref={contentRef} className={`${StdLayout.FlexCol}`}>
                <div className={`${StdColors.LightGray} ${StdLayout.FlexCol} ${StdMargin.T12} ${StdMargin.B18}`}>
                    <p>{kbToStr(diskUsage)} of total repo disk usage</p>
                    <p>{totalCount} repo commits</p>
                </div>

                <LanguageData languageData={languageData} chartWidth={590} chartHeight={390} />
            </div>
        </Dropdown>
    )
}
