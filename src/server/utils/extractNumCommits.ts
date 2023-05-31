// called using headers from GH_API_countCommits
// https://gist.github.com/0penBrain/7be59a48aba778c955d992aa69e524c5
export const extractNumCommitsFromHeaders = (headers: Headers): number => {
    const linkVal = headers.get('link')
    // console.log(linkVal)
    if (linkVal === null) {
        return 0
    }

    const re = /\d+(?=>;\srel="last")/
    const match = linkVal.match(re)
    // console.log(match)
    if (match === null || match.length < 1) {
        return 0
    }

    return parseInt(match[0])
}
