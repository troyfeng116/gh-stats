import { GH_API_Call__getUser } from '@/server/lib/gh-api/users'
import { computeLinesStatsAcrossReposUsingMetrics } from '@/server/services/linesStats'
import { SERVICE_Call__getAllReposWithCommitCounts } from '@/server/services/reposAndCommitCounts'
import {
    SHARED_APIFields__LifetimeStats,
    SHARED_Model__AllLanguageStats,
    SHARED_Model__LifetimeStats,
    SHARED_Model__RepoCommitCountStats,
    SHARED_Model__RepoWithCommitCountsAndLanguages,
} from '@/shared/models'

const sharedRepoReduceLanguageStats = (
    repos: SHARED_Model__RepoWithCommitCountsAndLanguages[],
): SHARED_Model__AllLanguageStats => {
    let totalDiskUsage = 0
    const languageToDisk: { [key: string]: number } = {}

    for (let i = 0; i < repos.length; i++) {
        const { languageData } = repos[i]
        for (let j = 0; j < languageData.length; j++) {
            const { size, name } = languageData[j]
            totalDiskUsage += size
            if (languageToDisk[name] === undefined) {
                languageToDisk[name] = 0
            }
            languageToDisk[name] += size
        }
    }
    return {
        totalDiskUsage: totalDiskUsage,
        languageToDisk: languageToDisk,
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

    const { success: userSuccess, error: userError, user } = await GH_API_Call__getUser(accessToken)
    if (!userSuccess || user === undefined) {
        return { lifetimeStats: undefined, success: false, error: userError }
    }

    const { login: authUser } = user
    const {
        success: linesSuccess,
        error: linesError,
        data: linesData,
    } = await computeLinesStatsAcrossReposUsingMetrics(accessToken, authUser, repos)
    if (!linesSuccess || linesData === undefined) {
        return { lifetimeStats: undefined, success: false, error: linesError }
    }

    const { reposWithLinesStats, totalLinesStats } = linesData

    const rcStats: SHARED_Model__RepoCommitCountStats = {
        numRepos: reposWithLinesStats.length,
        numCommits: sharedRepoReduceCommits(reposWithLinesStats),
    }
    const totalLanguageStats: SHARED_Model__AllLanguageStats = sharedRepoReduceLanguageStats(reposWithLinesStats)

    const lifetimeStats: SHARED_Model__LifetimeStats = {
        repos: reposWithLinesStats,
        rc_stats: rcStats,
        lines_stats: totalLinesStats,
        language_stats: totalLanguageStats,
    }

    console.log(totalLanguageStats)
    return { lifetimeStats: lifetimeStats, success: true }
}
