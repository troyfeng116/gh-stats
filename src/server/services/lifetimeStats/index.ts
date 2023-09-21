import { SERVICE_Call__getAllReposWithCommitCounts } from '@/server/services/reposAndCommitCounts'
import { diskUsageToApproxLoc } from '@/server/utils/diskUsageToApproxLoc'
import { SHARED_APIFields__LifetimeStats } from '@/shared/models/apiFields/lifetimeStats'
import { SHARED_Model__AllLanguageStats, SHARED_Model__Language } from '@/shared/models/models/Language'
import { SHARED_Model__RepoWithCommitCountsAndLanguages } from '@/shared/models/models/Repos'
import { SHARED_Model__LifetimeStats } from '@/shared/models/models/Stats'
import { SHARED_Model__RepoCommitCountStats } from '@/shared/models/models/Stats'

const sharedRepoReduceLanguageStats = (
    repos: SHARED_Model__RepoWithCommitCountsAndLanguages[],
): SHARED_Model__AllLanguageStats => {
    let totalDiskUsage = 0
    const languageToDisk: { [key: string]: { totalSize: number; color: string } } = {}

    for (let i = 0; i < repos.length; i++) {
        const { languageData } = repos[i]
        for (let j = 0; j < languageData.length; j++) {
            const { size, color, name } = languageData[j]
            totalDiskUsage += size
            if (languageToDisk[name] === undefined) {
                languageToDisk[name] = { totalSize: 0, color: color }
            }
            languageToDisk[name].totalSize += size
        }
    }

    const allLanguageData: SHARED_Model__Language[] = []

    for (const name in languageToDisk) {
        const { totalSize, color } = languageToDisk[name]
        allLanguageData.push({ size: totalSize, color: color, name: name, approxLoc: diskUsageToApproxLoc(totalSize) })
    }

    return {
        totalDiskUsage: totalDiskUsage,
        allLanguageData: allLanguageData.sort((a, b) => b.size - a.size),
    }
}

const sharedRepoReduceCommits = (repos: SHARED_Model__RepoWithCommitCountsAndLanguages[]): number => {
    let totalCommits = 0
    for (const { totalCount } of repos) {
        totalCommits += totalCount
    }
    return totalCommits
}

const sharedRepoReduceDiskUsage = (repos: SHARED_Model__RepoWithCommitCountsAndLanguages[]): number => {
    let totalDiskUsage = 0
    for (const { diskUsage } of repos) {
        totalDiskUsage += diskUsage
    }
    return totalDiskUsage
}

export const SERVICE_Call__computeLifetimeStats = async (
    accessToken: string,
): Promise<SHARED_APIFields__LifetimeStats> => {
    const { success: rcSuccess, error: rcError, repos } = await SERVICE_Call__getAllReposWithCommitCounts(accessToken)

    if (!rcSuccess || repos === undefined) {
        return { lifetimeStats: undefined, success: false, error: rcError }
    }

    const filteredRepos: SHARED_Model__RepoWithCommitCountsAndLanguages[] = repos.filter(
        ({ totalCount }) => totalCount > 0,
    )

    const rcStats: SHARED_Model__RepoCommitCountStats = {
        numRepos: filteredRepos.length,
        numCommits: sharedRepoReduceCommits(filteredRepos),
        totalDiskUsage: sharedRepoReduceDiskUsage(filteredRepos),
    }
    const totalLanguageStats: SHARED_Model__AllLanguageStats = sharedRepoReduceLanguageStats(filteredRepos)

    const lifetimeStats: SHARED_Model__LifetimeStats = {
        repos: filteredRepos,
        rc_stats: rcStats,
        language_stats: totalLanguageStats,
    }

    console.log(totalLanguageStats)
    return { lifetimeStats: lifetimeStats, success: true }
}
