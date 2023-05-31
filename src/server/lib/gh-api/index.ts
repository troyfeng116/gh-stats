/*
This folder contains wrappers around raw requests to the GitHub API.
*/

export const BASE_GH_API_URL = 'https://api.github.com'

// max `per_page` query param for listing repos/commits from GitHub API
export const PAGE_SIZE = 100

/*
Make authenticated calls to GitHub API
Return raw `Response` objects
*/

export const getGitHubAPI = async (url: string, accessToken: string): Promise<Response> => {
    const res = await fetch(`${BASE_GH_API_URL}${url}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'X-GitHub-Api-Version': '2022-11-28',
            Accept: 'application/vnd.github+json',
            // TODO: caching (rate limit)
            // 'If-Modified-Since': new Date(Date.now() - 60 * 60 * 1000).toUTCString(),
        },
    })

    // console.log(res)
    // console.log(res.headers)

    return res
}
