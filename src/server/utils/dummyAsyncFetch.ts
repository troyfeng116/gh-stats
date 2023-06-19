export const dummyAsyncFunction = async <T extends string>(dummyReturnValue: T, timeoutMs = 1000): Promise<string> => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(dummyReturnValue), timeoutMs)
    })
}
