import { useEffect, useRef } from "react"

function useScrollIntoView<T extends HTMLElement>(): React.RefObject<T | null> {
    const ref = useRef<T>(null)

    useEffect(() => {
        ref.current?.scrollIntoView()
    }, [])

    return ref
}

export default useScrollIntoView
