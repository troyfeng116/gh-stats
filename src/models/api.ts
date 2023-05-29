export interface TestAPIResponse {
    numStars: number
}

export interface GetTokenAPIResponse {
    success: boolean
    error?: string
    accessToken?: string
}

export interface ValidateTokenAPIResponse {
    success: boolean
    error?: string
}
