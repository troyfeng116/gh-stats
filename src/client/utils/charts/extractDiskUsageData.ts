import { attachDiskUsageColors } from './chartColors'

import { SHARED_Model__RepoWithCommitCounts } from '@/shared/models/models/Repos'

export const extractDiskUsageData = (
    repoData: SHARED_Model__RepoWithCommitCounts[],
): { repoName: string; repoKey: string; diskUsage: number; color: string }[] => {
    const diskUsageData: { repoName: string; repoKey: string; diskUsage: number }[] = repoData.map(
        ({ name, owner: { login }, diskUsage }) => {
            return { repoName: name, repoKey: `${login}/${name}`, diskUsage: diskUsage }
        },
    )

    return attachDiskUsageColors(diskUsageData)
}
