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
    const linesStats = await computeLinesStatsAcrossReposUsingMetrics(accessToken, authUser, repos)

    const rcStats: SHARED_Model__RepoCommitCountStats = {
        numRepos: repos.length,
        numCommits: sharedRepoReduceCommits(repos),
    }

    const languageStats: SHARED_Model__AllLanguageStats = sharedRepoReduceLanguageStats(repos)

    const lifetimeStats: SHARED_Model__LifetimeStats = {
        repos: repos,
        rc_stats: rcStats,
        lines_stats: linesStats,
        language_stats: languageStats,
    }

    console.log(languageStats)
    return { lifetimeStats: lifetimeStats, success: true }
}
