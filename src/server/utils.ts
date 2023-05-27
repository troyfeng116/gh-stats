import { type TestAPIResponse } from '@/models/test'

export const dummyAsyncFunction = async <T extends string>(dummyReturnValue: T, timeoutMs = 1000): Promise<string> => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(dummyReturnValue), timeoutMs)
    })
}

export const DUMMY_TEST_API_RESPONSE: TestAPIResponse = {
    numStars: 999,
}
