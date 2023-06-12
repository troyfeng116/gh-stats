export const bytesToStr = (bytes: number, places = 2): string => {
    if (bytes >= 1e12) {
        return `${(bytes / 1e12).toFixed(places)}TB`
    }
    if (bytes >= 1e9) {
        return `${(bytes / 1e9).toFixed(places)}GB`
    }
    if (bytes >= 1e6) {
        return `${(bytes / 1e6).toFixed(places)}MB`
    }
    if (bytes >= 1e3) {
        return `${(bytes / 1e3).toFixed(places)}KB`
    }
    return `${bytes}B`
}

export const kbToStr = (kbs: number, places = 2): string => {
    if (kbs >= 1e9) {
        return `${(kbs / 1e9).toFixed(places)}TB`
    }
    if (kbs >= 1e6) {
        return `${(kbs / 1e6).toFixed(places)}GB`
    }
    if (kbs >= 1e3) {
        return `${(kbs / 1e3).toFixed(places)}MB`
    }
    return `${kbs}KB`
}
