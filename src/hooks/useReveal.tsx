import { useEffect, useRef } from "react"

const STAGGER_MS = 100

function reveal(element: Element, index: number): void {
    if (element instanceof HTMLElement) {
        element.style.transitionDelay = `${index * STAGGER_MS}ms`
    }
    element.setAttribute('data-revealed', '')
}

function useReveal<T extends HTMLElement>(): React.RefObject<T | null> {
    const ref = useRef<T>(null)

    useEffect(() => {
        const container = ref.current
        if (!container) return

        if (!('IntersectionObserver' in window)) {
            Array.from(container.children).forEach(reveal)
            return
        }

        const intersection = new IntersectionObserver(entries => {
            entries
                .filter(entry => entry.isIntersecting)
                .forEach((entry, index) => {
                    reveal(entry.target, index)
                    intersection.unobserve(entry.target)
                })
        }, { rootMargin: '0px 0px -15% 0px' })

        const observeChildren = (): void => {
            Array.from(container.children)
                .filter(child => !child.hasAttribute('data-revealed'))
                .forEach(child => intersection.observe(child))
        }

        const mutation = new MutationObserver(observeChildren)
        mutation.observe(container, { childList: true })
        observeChildren()

        return () => {
            intersection.disconnect()
            mutation.disconnect()
        }
    }, [])

    return ref
}

export default useReveal
