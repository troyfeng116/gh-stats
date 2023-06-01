import { getAllReposWithCommitCounts } from '../gql/countCommitsService'
import { computeLinesStatsAcrossReposUsingMetrics } from '../linesStats'

import { GH_API_Call__getUser } from '@/server/lib/gh-api/users'
import { SHARED_APIFields__LifetimeStats, SHARED_Model__LifetimeStats } from '@/shared/models'

export const computeLifetimeStats = async (accessToken: string): Promise<SHARED_APIFields__LifetimeStats> => {
    const { success: rcSuccess, error: rcError, repos, rc_stats } = await getAllReposWithCommitCounts(accessToken)

    if (!rcSuccess || repos === undefined || rc_stats === undefined) {
        return { lifetimeStats: undefined, success: false, error: rcError }
    }

    const { success: userSuccess, error: userError, user } = await GH_API_Call__getUser(accessToken)
    if (!userSuccess || user === undefined) {
        return { lifetimeStats: undefined, success: false, error: userError }
    }

    const { login: authUser } = user
    const linesStats = await computeLinesStatsAcrossReposUsingMetrics(accessToken, authUser, repos)

    const lifetimeStats: SHARED_Model__LifetimeStats = {
        repos: repos,
        rc_stats: rc_stats,
        l_stats: linesStats,
    }

    return { lifetimeStats: lifetimeStats, success: true }
}
