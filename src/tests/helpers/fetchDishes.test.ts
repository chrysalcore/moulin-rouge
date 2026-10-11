import { describe, expect, it, vi } from 'vitest'
import axios from 'axios'
import fetchDishes from '../../helpers/fetchDishes'
import { MENU_URL, buildDishes } from '../fixtures/menu'

vi.mock('axios', () => ({
    default: { get: vi.fn() },
}))

describe('fetchDishes', () => {
    it('returns the dishes from the api', async () => {
        const dishes = buildDishes()
        vi.mocked(axios.get).mockResolvedValue({ data: dishes })

        const result = await fetchDishes(MENU_URL)

        expect(axios.get).toHaveBeenCalledWith(MENU_URL)
        expect(result).toEqual(dishes)
    })

    it('rejects when the api call fails', async () => {
        const error = new Error('Network Error')
        vi.mocked(axios.get).mockRejectedValue(error)

        await expect(fetchDishes(MENU_URL)).rejects.toBe(error)
    })

    it('rejects when the api responds with a non-array body', async () => {
        vi.mocked(axios.get).mockResolvedValue({ data: { redirected: true } })

        await expect(fetchDishes(MENU_URL)).rejects.toThrow('Unexpected response shape')
    })
})
