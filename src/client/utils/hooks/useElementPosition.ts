import { MutableRefObject, useEffect, useState } from 'react'

interface ElementPosition {
    top: number
    right: number
    bottom: number
    left: number
    width: number
    height: number
}

export const useElementPosition = (ref: MutableRefObject<Element | null>): ElementPosition | undefined => {
    const [elementPosition, setElementPosition] = useState<ElementPosition>()

    useEffect(() => {
        if (ref.current !== null) {
            const domRect = ref.current.getBoundingClientRect()
            setElementPosition(domRect as ElementPosition)
        } else {
            setElementPosition(undefined)
        }
    }, [ref.current])

    return elementPosition
}
