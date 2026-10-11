import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Stars from '../../../components/others/Stars'

function getStarFills(rating: number): (string | null)[] {
    render(<Stars rating={rating} />)

    const stars = screen.getByRole('img', { name: `Rated ${rating} out of 5` })
    return Array.from(stars.querySelectorAll('path'), (path) => path.getAttribute('fill'))
}

describe('Stars', () => {
    it('fills whole stars up to the rating and leaves the rest empty', () => {
        expect(getStarFills(3)).toEqual(['#ffc107', '#ffc107', '#ffc107', 'none', 'none'])
    })

    it('half-fills the star a .5 rating lands on with a gradient that exists in the DOM', () => {
        const fills = getStarFills(3.5)

        expect(fills.slice(0, 3)).toEqual(['#ffc107', '#ffc107', '#ffc107'])
        expect(fills[4]).toBe('none')

        const gradientId = fills[3]?.match(/^url\(#(.+)\)$/)?.[1]
        expect(gradientId).toBeDefined()
        expect(document.getElementById(gradientId!)?.tagName).toBe('linearGradient')
    })

    it('gives each instance its own gradient id', () => {
        render(<><Stars rating={2.5} /><Stars rating={4.5} /></>)

        const gradients = document.querySelectorAll('linearGradient')
        expect(gradients).toHaveLength(2)
        expect(gradients[0].id).not.toBe(gradients[1].id)
    })
})
