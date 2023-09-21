import { BASE_GH_GQL_Call__makeQueryWithAuth, GH_GQL_RawResponse__BASE, GH_GQL_Response__BASE } from '..'

import { GH_GQL_Query__Viewer, GH_GQL_QueryVars__Viewer, GH_GQL_Schema__Viewer } from './query'

interface GH_GQL_RawResponse__Viewer extends GH_GQL_RawResponse__BASE {
    data?: {
        viewer: GH_GQL_Schema__Viewer
    }
}

export interface GH_GQL_Response__Viewer extends GH_GQL_Response__BASE {
    viewer?: GH_GQL_Schema__Viewer
}

export const GH_GQL_Call__Viewer = async (
    accessToken: string,
    variables: GH_GQL_QueryVars__Viewer,
): Promise<GH_GQL_Response__Viewer> => {
    const res = await BASE_GH_GQL_Call__makeQueryWithAuth(accessToken, GH_GQL_Query__Viewer, variables)
    const { status, statusText } = res

    if (status !== 200) {
        return { viewer: undefined, success: false, error: `error ${status}: ${statusText}` }
    }

    const resJson = (await res.json()) as GH_GQL_RawResponse__Viewer
    console.log(resJson)
    const { data, errors: queryErrors } = resJson

    if (data === undefined || queryErrors !== undefined) {
        return {
            viewer: undefined,
            success: false,
            error: `error: ${queryErrors !== undefined ? queryErrors[0].message : 'unknown (GraphQL)'}`,
        }
    }

    const { viewer } = data
    return { viewer: viewer, success: true }
}
