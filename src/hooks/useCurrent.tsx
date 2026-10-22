import { useState } from "react"

type UseCurrentReturn = [
    current: number,
    handleNext: () => void,
    handlePrev: () => void
]

function useCurrent(length: number): UseCurrentReturn {
    const [current, setCurrent] = useState<number>(0)

    const handleNext = (): void => {
        setCurrent(c => (c + 1) % length)
    }

    const handlePrev = (): void => {
        setCurrent(c => (c - 1 + length) % length)
    }

    return [
        current,
        handleNext,
        handlePrev
    ]
}

export default useCurrent
