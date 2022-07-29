import { createContext, Dispatch, useContext, useReducer } from 'react'
import { CatalogObject } from 'square'
import { cartReducer, Action } from './Reducers'


export interface CartContextInterface {
    state: ProductState
    dispatch: Dispatch<Action>
}


export interface CartCatalogObject {
    [key: string]:{
        id: string
        variationId: string
        name: string
        imgSrc: string
        imgName: string
        price: bigint
        variationName: string
        qty?: number
    }
}

export interface ProductState {
    products: CatalogObject[]
    cart: CartCatalogObject
}

const Cart = createContext<CartContextInterface | null >(null)

const Context = ({ children }) => {
    const initialState: ProductState = {
        products: [],
        cart: {},
    }
    const [state, dispatch] = useReducer( cartReducer, initialState)
    return <Cart.Provider value={{ state, dispatch }}>{children}</Cart.Provider>
}


export const CartState = () => {
    return useContext(Cart)
}


export default Context