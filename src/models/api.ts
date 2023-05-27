export interface TestAPIResponse {
    numStars: number
}

export interface GetTokenAPIResponse {
    success: boolean
    error?: string
    accessToken?: string
    refreshToken?: string
}
