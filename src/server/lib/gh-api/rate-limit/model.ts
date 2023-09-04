export interface GH_API_Obj__RateLimitPerResource {
    limit: number
    used: number
    remaining: number
    reset: number
}

// https://docs.github.com/en/free-pro-team@latest/rest/rate-limit/rate-limit?apiVersion=2022-11-28#get-rate-limit-status-for-the-authenticated-user
export interface GH_API_Obj__RateLimit {
    resources: {
        core: GH_API_Obj__RateLimitPerResource
        search: GH_API_Obj__RateLimitPerResource
        graphql: GH_API_Obj__RateLimitPerResource
        integration_manifest: GH_API_Obj__RateLimitPerResource
        source_import: GH_API_Obj__RateLimitPerResource
        code_scanning_upload: GH_API_Obj__RateLimitPerResource
        actions_runner_registration: GH_API_Obj__RateLimitPerResource
        scim: GH_API_Obj__RateLimitPerResource
        dependency_snapshots: GH_API_Obj__RateLimitPerResource
        code_search: GH_API_Obj__RateLimitPerResource
    }
    rate: GH_API_Obj__RateLimitPerResource
}
