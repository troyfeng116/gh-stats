import { BASE_GH_API_URL } from '@/server/lib/gh-api'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getGitHubAPI = async (url: string, accessToken: string): Promise<any> => {
    return await fetch(`${BASE_GH_API_URL}, ${url}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'X-GitHub-Api-Version': '2022-11-28',
            Accept: 'application/vnd.github+json',
        },
    })
}
