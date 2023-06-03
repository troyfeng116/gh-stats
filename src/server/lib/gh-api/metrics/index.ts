import { BASE_GH_API_Call__getWithAuth, GH_API_Response__BASE } from '..'

import { GH_API_Obj__ContributorActivity } from './model'

export interface GH_API_Response__getAllContributorActivity extends GH_API_Response__BASE {
    allActivity?: GH_API_Obj__ContributorActivity[]
}

// https://docs.github.com/en/rest/metrics/statistics?apiVersion=2022-11-28#get-all-contributor-commit-activity
export const GH_API_Call__getAllContributorActivity = async (
    accessToken: string,
    owner: string,
    repo: string,
): Promise<GH_API_Response__getAllContributorActivity> => {
    const url = `/repos/${owner}/${repo}/stats/contributors`

    const res = await BASE_GH_API_Call__getWithAuth(url, accessToken)
    const { status, statusText } = res

    /*
    If the data hasn't been cached when you query a repository's statistics, you'll receive a 202 response;
    a background job is also fired to start compiling these statistics.
    You should allow the job a short time to complete, and then submit the request again.
    */
    if (status === 202) {
        // TODO: configure this timeout
        await new Promise((r) => setTimeout(r, 1000))
        console.log('[GH_API_Call__getAllContributorActivity] retry')
        return await GH_API_Call__getAllContributorActivity(accessToken, owner, repo)
    }

    if (status !== 200) {
        return { allActivity: undefined, success: false, error: `error ${status}: ${statusText}` }
    }

    const resJson: GH_API_Obj__ContributorActivity[] = (await res.json()) as GH_API_Obj__ContributorActivity[]
    // console.log(resJson)

    return { allActivity: resJson, success: true }
}
