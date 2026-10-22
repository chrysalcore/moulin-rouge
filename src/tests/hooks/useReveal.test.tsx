import React from 'react'
import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import useReveal from '../../hooks/useReveal'

type Callback = (entries: { target: Element; isIntersecting: boolean }[]) => void

let observed: Element[] = []
let notify: Callback = () => {}

class FakeIntersectionObserver {
    constructor(callback: Callback) {
        notify = callback
    }
    observe(element: Element) {
        observed.push(element)
    }
    unobserve(element: Element) {
        observed = observed.filter(item => item !== element)
    }
    disconnect() {
        observed = []
    }
}

function Revealed({ items }: { items: string[] }) {
    const ref = useReveal<HTMLDivElement>()

    return (
        <div ref={ref}>
            {items.map(item => <p key={item}>{item}</p>)}
        </div>
    )
}

function enter(...elements: Element[]) {
    notify(elements.map(target => ({ target, isIntersecting: true })))
}

describe('useReveal', () => {
    beforeEach(() => {
        observed = []
        vi.stubGlobal('IntersectionObserver', FakeIntersectionObserver)
    })

    it('reveals each child only once it enters the viewport', () => {
        render(<Revealed items={['First', 'Second', 'Third']} />)
        const [first, second, third] = ['First', 'Second', 'Third'].map(text => screen.getByText(text))

        expect(first).not.toHaveAttribute('data-revealed')

        enter(first, second)

        expect(first).toHaveAttribute('data-revealed')
        expect(second).toHaveAttribute('data-revealed')
        expect(third).not.toHaveAttribute('data-revealed')
        expect(observed).toEqual([third])
    })

    it('observes children that appear after mounting', async () => {
        const { rerender } = render(<Revealed items={['Loading']} />)

        rerender(<Revealed items={['Loading', 'Content']} />)
        const content = screen.getByText('Content')

        await vi.waitFor(() => expect(observed).toContain(content))
        enter(content)

        expect(content).toHaveAttribute('data-revealed')
    })
})
