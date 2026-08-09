import '@testing-library/jest-dom/vitest'
import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'

window.HTMLElement.prototype.scrollIntoView = function () {}

afterEach(() => {
    cleanup()
    localStorage.clear()
})
