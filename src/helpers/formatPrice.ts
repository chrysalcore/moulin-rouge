const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })

function formatPrice(price: number): string {
    return currency.format(price)
}

export default formatPrice
