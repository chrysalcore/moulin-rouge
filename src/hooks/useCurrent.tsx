import { useState } from "react"

type UseCurrentReturn = [
    current: number,
    handleNext: () => void,
    handlePrev: () => void
]

const MAX_INDEX = 4

function useCurrent(): UseCurrentReturn {
    const [current, setCurrent] = useState<number>(0)

    const handleNext = (): void => {
        if (current === MAX_INDEX) {
            setCurrent(0)
        } else {
            setCurrent(c => c + 1)
        }
    }

    const handlePrev = (): void => {
        if (current === 0) {
            setCurrent(MAX_INDEX)
        } else {
            setCurrent(c => c - 1)
        }
    }

    return [
        current,
        handleNext,
        handlePrev
    ]
}

export default useCurrent
