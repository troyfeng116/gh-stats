export interface SHARED_Model__Language {
    size: number
    color: string
    name: string
    approxLoc: number
}

export interface SHARED_Model__AllLanguageStats {
    totalDiskUsage: number
    allLanguageData: SHARED_Model__Language[]
}
