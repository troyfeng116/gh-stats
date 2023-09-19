import React from 'react'

import StatRow from '@/client/components/Reuse/StatRow'
import { StdLayout } from '@/client/styles'
import { SHARED_Model__RepoCommitCountStats } from '@/shared/models/models/Stats'
import { kbToStr } from '@/shared/utils/toBytesStr'

interface ReposSummaryProps {
    repoCommitCountStats: SHARED_Model__RepoCommitCountStats
}

export const ReposSummary: React.FC<ReposSummaryProps> = (props) => {
    const { repoCommitCountStats } = props
    const { numRepos, numCommits, totalDiskUsage } = repoCommitCountStats

    return (
        <div className={`${StdLayout.FlexCol}`}>
            <StatRow value={numRepos} label="public repos" />
            <StatRow value={numCommits} label="commits" />
            <StatRow value={kbToStr(totalDiskUsage)} label="total disk usage" />
        </div>
    )
}
