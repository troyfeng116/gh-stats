import { SHARED_Model__Language } from '@/shared/models/models/Language'

/**
 * Compute total approximate lines of code across all given language data.
 *
 * @param languageData Language data models.
 * @returns Total approxLoc aggregated across language data.
 */
export const computeTotalLoc = (languageData: SHARED_Model__Language[]): number => {
    return languageData.map(({ approxLoc }) => approxLoc).reduce((prevLoc, curLoc) => prevLoc + curLoc)
}
