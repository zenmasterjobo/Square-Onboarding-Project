import { CartCatalogObject, ProductState } from './Context'

export interface Action {
    type: string
    payload: CartCatalogObject
}

export const cartReducer = (state: ProductState, action: Action) => {
    const itemId = Object.keys(action.payload)[0]
    switch (action.type) {
        case 'ADD_TO_CART':
            // check if the incoming id is already in the cart
            if ( state.cart[itemId]) {
                action.payload[itemId].qty += state.cart[itemId].qty
                return { ...state, cart: { ...state.cart, ...action.payload } }
            } else {
                action.payload[itemId].qty = 1
               return { ...state, cart:{ ...state.cart, ...action.payload } }
            }

        case 'REMOVE_FROM_CART':
            delete state.cart[itemId]
            return { ...state, cart: { ...state.cart } }

        case 'CHANGE_CART_QTY':
            return { ...state, cart:{ ...state.cart, ...action.payload } }

        case 'CLEAR_CART':
            return { ...state, cart:{} }
            
        default:
            return state
    }
}
