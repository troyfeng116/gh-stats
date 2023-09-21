import { SHARED_Model__CommitContributionsByRepo } from '@/shared/models/models/Contributions'

export const getRepoKey = (repoContributions: SHARED_Model__CommitContributionsByRepo): string => {
    const {
        repository: {
            name,
            owner: { login },
        },
    } = repoContributions
    return `${login}/${name}`
}
