import '@testing-library/jest-dom/vitest'
import { afterEach } from 'vitest'
import { cleanup, configure } from '@testing-library/react'

configure({ asyncUtilTimeout: 5000 })

window.HTMLElement.prototype.scrollIntoView = function () {}

afterEach(() => {
    cleanup()
})
