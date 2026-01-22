import { useState } from "react"

function useCurrent() {
    const [current, setCurrent] = useState(0)

    const handleNext = () => {
        if (current === 4) {
            setCurrent(0)
        } else {
            setCurrent(c => c + 1)
        }
    }

    const handlePrev = () => {
        if (current === 0) {
            setCurrent(4)
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

export default useCurrent;