import { SERVICE_Call__getAllReposWithCommitCounts } from '@/server/services/reposAndCommitCounts'
import { SHARED_APIFields__LifetimeStats, SHARED_Model__LifetimeStats } from '@/shared/models/apiFields/lifetimeStats'
import { SHARED_Model__AllLanguageStats } from '@/shared/models/models/Language'
import { SHARED_Model__RepoWithCommitCountsAndLanguages } from '@/shared/models/models/Repos'
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

    const allLanguageData: {
        size: number
        color: string
        name: string
    }[] = []

    for (const name in languageToDisk) {
        const { totalSize, color } = languageToDisk[name]
        allLanguageData.push({ size: totalSize, color: color, name: name })
    }

    return {
        totalDiskUsage: totalDiskUsage,
        allLanguageData: allLanguageData,
    }
}

const sharedRepoReduceCommits = (repos: SHARED_Model__RepoWithCommitCountsAndLanguages[]): number => {
    let totalCommits = 0
    for (let i = 0; i < repos.length; i++) {
        const { totalCount } = repos[i]
        totalCommits += totalCount
    }
    return totalCommits
}

export const SERVICE_Call__computeLifetimeStats = async (
    accessToken: string,
): Promise<SHARED_APIFields__LifetimeStats> => {
    const { success: rcSuccess, error: rcError, repos } = await SERVICE_Call__getAllReposWithCommitCounts(accessToken)

    if (!rcSuccess || repos === undefined) {
        return { lifetimeStats: undefined, success: false, error: rcError }
    }

    const rcStats: SHARED_Model__RepoCommitCountStats = {
        numRepos: repos.length,
        numCommits: sharedRepoReduceCommits(repos),
    }
    const totalLanguageStats: SHARED_Model__AllLanguageStats = sharedRepoReduceLanguageStats(repos)

    const lifetimeStats: SHARED_Model__LifetimeStats = {
        repos: repos,
        rc_stats: rcStats,
        language_stats: totalLanguageStats,
    }

    console.log(totalLanguageStats)
    return { lifetimeStats: lifetimeStats, success: true }
}
