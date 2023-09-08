import { SERVICE_Response__BASE } from '..'

import { GH_GQL_Call__ContributionsAggregate } from '@/server/lib/gh-gql/ContributionsAggregate'
import { chunkFromToRange } from '@/server/utils/chunkFromTo'
import {
    CONVERTER__contributionsAggregateSchemaToShared,
    REDUCER__contributionsAggregate_INITIAL_VALUE,
    REDUCER__contributionsAggregateMerger,
} from '@/shared/models/converters/ContributionsConverters'
import { SHARED_Model__ContributionsAggregate } from '@/shared/models/models/Contributions'

interface SERVICE_Response__ContributionsAggregate extends SERVICE_Response__BASE {
    contributionsAggregate?: SHARED_Model__ContributionsAggregate
}

/**
 * Retrieves aggregate contributions.
 * Assumes `from` and `to` are valid if set; that is, ISO 6801 UTC formatted strings, with range at most 1 year).
 *
 * @param from If defined, valid ISO 6801 UTC formatted string. At most 1 year before `to`.
 * @param to If defined, valid ISO 6801 UTC formatted string. At most 1 year after `from`.
 *
 * @returns Aggregate contributions if GraphQL request successful.
 */
const getContributionsAggregateForSingleChunk = async (
    accessToken: string,
    from?: string,
    to?: string,
): Promise<SERVICE_Response__ContributionsAggregate> => {
    const { success, error, contributionsAggregate } = await GH_GQL_Call__ContributionsAggregate(accessToken, {
        from: from,
        to: to,
    })

    if (!success || contributionsAggregate === undefined) {
        return { success: false, error: error, contributionsAggregate: undefined }
    }

    const convertedContributionsAggregate: SHARED_Model__ContributionsAggregate =
        CONVERTER__contributionsAggregateSchemaToShared(contributionsAggregate)

    return { success: true, contributionsAggregate: convertedContributionsAggregate }
}

interface SERVICE_Response__ContributionsAggregateWithRangeChunks extends SERVICE_Response__BASE {
    contributionsAggregateList?: SHARED_Model__ContributionsAggregate[]
}

/**
 * Chunks `from` and `to` range into chunks of one year,
 * to avoid range limit errors from GraphQL API.
 *
 * @param from Date string.
 * @param to Date string.
 *
 * @returns List of aggregate contribution models if all requests successful (transaction). Fails if at least one request fails.
 */
const getContributionsAggregateWithRangeChunks = async (
    accessToken: string,
    from: string,
    to: string,
): Promise<SERVICE_Response__ContributionsAggregateWithRangeChunks> => {
    const rangeChunks = chunkFromToRange(from, to, 365)

    const rangeChunkResults: SHARED_Model__ContributionsAggregate[] = []
    for (const { from: chunkFrom, to: chunkTo } of rangeChunks) {
        const { success, error, contributionsAggregate } = await getContributionsAggregateForSingleChunk(
            accessToken,
            chunkFrom,
            chunkTo,
        )
        if (!success || contributionsAggregate === undefined) {
            return { success: false, error: error, contributionsAggregateList: undefined }
        }
        rangeChunkResults.push(contributionsAggregate)
    }

    return { success: true, contributionsAggregateList: rangeChunkResults }
}

/**
 * Given any `from` and `to` range, retrieve aggregate contribution stats.
 * Succeeds even if `from` and `to` are set to more than a year apart.
 *
 * @param from If defined, valid ISO 6801 UTC formatted string.
 * @param to If defined, valid ISO 6801 UTC formatted string.
 */
export const SERVICE_Call__getContributionsAggregate = async (
    accessToken: string,
    from?: string,
    to?: string,
): Promise<SERVICE_Response__ContributionsAggregate> => {
    if (from !== undefined && to !== undefined) {
        const {
            success: chunkSuccess,
            error: chunkError,
            contributionsAggregateList,
        } = await getContributionsAggregateWithRangeChunks(accessToken, from, to)

        if (!chunkSuccess || contributionsAggregateList === undefined) {
            return { success: false, error: chunkError, contributionsAggregate: undefined }
        }

        const mergedContributionsAggregate: SHARED_Model__ContributionsAggregate = contributionsAggregateList.reduce(
            (prev, cur) => {
                return REDUCER__contributionsAggregateMerger(prev, cur)
            },
            REDUCER__contributionsAggregate_INITIAL_VALUE,
        )

        return { success: true, contributionsAggregate: mergedContributionsAggregate }
    }

    return await getContributionsAggregateForSingleChunk(accessToken, from, to)
}
