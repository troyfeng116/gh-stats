/*
This folder contains wrappers around raw requests to the GitHub API.
*/

export const BASE_GH_API_URL = 'https://api.github.com'

/*
Make authenticated calls to GitHub API
Return raw `Response` objects
*/

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getGitHubAPI = async (url: string, accessToken: string): Promise<any> => {
    const res = await fetch(`${BASE_GH_API_URL}${url}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'X-GitHub-Api-Version': '2022-11-28',
            Accept: 'application/vnd.github+json',
        },
    })

    console.log(res)
    console.log(res.headers)

    return res
}
