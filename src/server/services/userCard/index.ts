import { SERVICE_Response__BASE } from '..'

import { GH_API_Call__getUser } from '@/server/lib/gh-api/users'
import { GH_GQL_Call__Viewer } from '@/server/lib/gh-gql/Viewer'
import { SERVICE_Call__getContributionsAggregate } from '@/server/services/contributionsAggregate'
import { toDateStringISO8601UTC } from '@/server/utils/dateUtils'
import { DAY_MS } from '@/shared/constants'
import { SHARED_APIFields__UserCard } from '@/shared/models/apiFields/userCard'
import {
    CONVERTER__userObjToSharedUserCard,
    CONVERTER__viewerSchemaToSharedUserCard,
} from '@/shared/models/converters/UserConverters'
import { SHARED_Model__UserCard } from '@/shared/models/models/UserCard'

export const SERVICE_Call__getUserCardDataFromGQL = async (
    accessToken: string,
): Promise<SHARED_APIFields__UserCard> => {
    const { success: viewerSuccess, error: viewerError, viewer } = await SERVICE_Call__getViewer(accessToken)

    if (!viewerSuccess || viewer === undefined) {
        return { success: false, error: viewerError, userCardClientInfo: undefined }
    }

    const { createdAt } = viewer
    const {
        success: contributionsSuccess,
        error: contributionsError,
        contributionsAggregate,
    } = await SERVICE_Call__getContributionsAggregate(
        accessToken,
        new Date(new Date(createdAt).getTime() - DAY_MS).toISOString(),
        toDateStringISO8601UTC(new Date()),
    )

    if (!contributionsSuccess || contributionsAggregate === undefined) {
        return { success: false, error: contributionsError, userCardClientInfo: undefined }
    }

    return {
        success: true,
        userCardClientInfo: {
            userCard: viewer,
            contributionsAggregate: contributionsAggregate,
        },
    }
}

interface SERVICE_Response__getViewer extends SERVICE_Response__BASE {
    viewer?: SHARED_Model__UserCard
}

export const SERVICE_Call__getViewer = async (accessToken: string): Promise<SERVICE_Response__getViewer> => {
    const { success: viewerSuccess, error: viewerError, viewer } = await GH_GQL_Call__Viewer(accessToken, {})

    if (!viewerSuccess || viewer === undefined) {
        return { success: false, error: viewerError, viewer: undefined }
    }

    const userCard: SHARED_Model__UserCard = CONVERTER__viewerSchemaToSharedUserCard(viewer)
    return { success: true, viewer: userCard }
}

export const SERVICE_Call__getUserCardDataFromAPI = async (
    accessToken: string,
): Promise<SHARED_APIFields__UserCard> => {
    const { user, success, error } = await GH_API_Call__getUser(accessToken)

    if (!success || user === undefined) {
        return { success: false, error: error, userCardClientInfo: undefined }
    }

    const userCard: SHARED_Model__UserCard = CONVERTER__userObjToSharedUserCard(user)

    const { createdAt } = userCard
    const {
        success: contributionsSuccess,
        error: contributionsError,
        contributionsAggregate,
    } = await SERVICE_Call__getContributionsAggregate(accessToken, createdAt, toDateStringISO8601UTC(new Date()))

    if (!contributionsSuccess || contributionsAggregate === undefined) {
        return { success: false, error: contributionsError, userCardClientInfo: undefined }
    }

    return {
        success: true,
        userCardClientInfo: {
            userCard: userCard,
            contributionsAggregate: contributionsAggregate,
        },
    }
}
