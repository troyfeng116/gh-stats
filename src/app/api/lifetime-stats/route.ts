// import { countLifetimeCommits } from '@/server/services/commitsService'
// import { computeLifetimeStatsUsingMetrics } from '@/server/services/metricsService'
import { AUTH_NO_TOKEN_ERROR_RES, checkAuthHeaders } from '@/server/utils/authHeaders'
import { SHARED_APIFields_GetLifetimeStats } from '@/shared/models'

/*
Requires authentication
Returns total lifetime commits
*/

export const GET = async (request: Request): Promise<Response> => {
    console.log('GET /api/lifetime-stats')

    const token = checkAuthHeaders(request)
    if (token === undefined) {
        return new Response(JSON.stringify(AUTH_NO_TOKEN_ERROR_RES), {
            status: 401,
        })
    }

    // const lifetimeCommitsRes: SHARED_CountCommitsResponse = await countLifetimeCommits(token)
    const lifetimeCommitsRes: SHARED_APIFields_GetLifetimeStats = {
        success: true,
        stats: {
            numRepos: 9,
            numCommits: 9999,
            numLines: 999999,
            numAdditions: 1000000,
            numDeletions: 1,
        },
    }
    const { success, stats } = lifetimeCommitsRes

    const status = !success || stats === undefined ? 400 : 200

    return new Response(JSON.stringify(lifetimeCommitsRes), {
        status: status,
    })
}
