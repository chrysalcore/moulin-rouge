import useResource from './useResource'
import fetchDishes from '../helpers/fetchDishes'

const DISHES_URL = 'https://devsapihub.com/api-fast-food'

function useDishes() {
    const dishes = useResource(['dishes', DISHES_URL], () => fetchDishes(DISHES_URL))
    const categories = [...new Set(dishes.data.map(item => item.category))]

    return { ...dishes, categories }
}

export default useDishes
