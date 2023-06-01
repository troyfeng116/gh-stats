import { BASE_GH_API_Call__getGitHubAPI } from '..'

import { GH_API_Obj__AllContributorActivity } from './model'

export interface GH_API_Response__getAllContributorActivity {
    success: boolean
    error?: string
    allActivity?: GH_API_Obj__AllContributorActivity
}

// https://docs.github.com/en/rest/metrics/statistics?apiVersion=2022-11-28#get-all-contributor-commit-activity
export const GH_API_Call__getAllContributorActivity = async (
    accessToken: string,
    owner: string,
    repo: string,
): Promise<GH_API_Response__getAllContributorActivity> => {
    const url = `/repos/${owner}/${repo}/stats/contributors`

    const res = await BASE_GH_API_Call__getGitHubAPI(url, accessToken)
    const { status, statusText } = res

    /*
    If the data hasn't been cached when you query a repository's statistics, you'll receive a 202 response;
    a background job is also fired to start compiling these statistics.
    You should allow the job a short time to complete, and then submit the request again.
    */
    if (status === 202) {
        await new Promise((r) => setTimeout(r, 1000))
        console.log('[GH_API_Call__getAllContributorActivity] retry')
        return await GH_API_Call__getAllContributorActivity(accessToken, owner, repo)
    }

    if (status !== 200) {
        return { allActivity: undefined, success: false, error: `error ${status}: ${statusText}` }
    }

    const resJson: GH_API_Obj__AllContributorActivity = (await res.json()) as GH_API_Obj__AllContributorActivity
    // console.log(resJson)

    return { allActivity: resJson, success: true }
}
