import { CartCatalogObject } from 'Context/Context'

export const formatPrice = (price:bigint | number):string => {
    return `$${(Number(price)/100).toFixed(2)}`
}

export const getTotal = (cart: CartCatalogObject) => {
  return Object.keys(cart).reduce((prev, key) => prev + Number(cart[key].price) * cart[key].qty, 0)
}