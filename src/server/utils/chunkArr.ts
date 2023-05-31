import { CHUNK_SIZE } from '@/server/constants'

export const chunkArr = <T>(arr: T[]): T[][] => {
    const chunkedArr: T[][] = []
    for (let i = 0; i < arr.length; i += CHUNK_SIZE) {
        chunkedArr.push(arr.slice(i, i + CHUNK_SIZE))
    }
    return chunkedArr
}
