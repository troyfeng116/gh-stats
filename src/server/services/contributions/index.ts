import { GH_GQL_Call__Contributions } from '@/server/lib/gh-gql/Contributions'
import { SHARED_APIFields__Contributions } from '@/shared/models/apiFields/contributions'
import { SHARED_Model__Contributions } from '@/shared/models/models/Contributions'

export const SERVICE_Call__getContributions = async (accessToken: string): Promise<SHARED_APIFields__Contributions> => {
    const { success, error, contributions } = await GH_GQL_Call__Contributions(accessToken, {})

    if (!success || contributions === undefined) {
        return { contributions: undefined, success: false, error: error }
    }

    return { contributions: contributions as SHARED_Model__Contributions, success: true }
}