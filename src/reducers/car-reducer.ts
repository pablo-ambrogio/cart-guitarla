import { db } from "../data/db";
import { CartItem, Guitar } from "../types/types";

// En este type definimos las acciones que va a tener el reducer
export type CartActions =
    // la acción 'add-to-cart' va a recibir un item de type Guitar
    { type: 'add-to-cart', payload: { item: Guitar } }
    |
    // la acción 'remove-from-cart' va a recibir un id de type Guitar['id']
    { type: 'remove-from-cart', payload: { id: Guitar['id'] } }
    |
    { type: 'increase-quantity', payload: { id: Guitar['id'] } }
    |
    { type: 'decrease-quantity', payload: { id: Guitar['id'] } }
    |
    { type: 'clear-cart' }

// Definiendo el State
export type CartState = {
    data: Guitar[]
    cart: CartItem[]
}


const initialCart = (): CartItem[] => {
    const localStorageCart = localStorage.getItem('cart')
    return localStorageCart ? JSON.parse(localStorageCart) : []
}

// Creamos el state inicial del useReducer y le asiganamos el type de CartState
export const initialState: CartState = {
    data: db,
    cart: initialCart()
}

const MIN_ITEMS = 1
const MAX_ITEMS = 5

// Creando las funciones de cartReducer
//* This is the function reducer where receive by params the state and the actions
// Esta es la funcion reducer donde recibe por parametros el state y las actions
export const cartReducer = (
    state: CartState = initialState,
    action: CartActions
) => {

    // Here is where this the logic the function
    // Aquí es donde esta la lógica de la función

    if (action.type === 'add-to-cart') {
        console.log("desde add-to-cart");

        // accedemos al cart desde state y le aplicamos el find    // accedemos al item que se encuentra dentro de payload.
        const itemExists = state.cart.find(guitar => guitar.id === action.payload.item.id)

        // definimos una variable updateCart para asiganarle los elementos
        let updateCart: CartItem[] = []

        if (itemExists) {
            updateCart = state.cart.map(item => {
                if (item.id === action.payload.item.id) {
                    if (item.quantity < MAX_ITEMS) {
                        return { ...item, quantity: item.quantity + 1 }
                    } else {
                        return item
                    }
                } else {
                    return item
                }
            })
        } else {
            const newItem: CartItem = { ...action.payload.item, quantity: 1 }
            updateCart = [...state.cart, newItem]
        }

        return {
            ...state,
            cart: updateCart
        }
    }

    if (action.type === 'remove-from-cart') {
        const itemRemove = state.cart.filter(cart => cart.id !== action.payload.id);

        return {
            ...state,
            cart: itemRemove
        }
    }

    if (action.type === 'increase-quantity') {
        // retornamos un nuevo array iterandolo con el metodo map
        const updateCart = state.cart.map(item => {

            // preguntamos si el item de la posición es igual al ID que le pasamos
            if (item.id === action.payload.id && item.quantity < MAX_ITEMS) {
                // retornamos la copia del item con el templateOperator pero solo modificando el atributo "quantity"
                return {
                    ...item,
                    quantity: item.quantity + 1
                }
            }
            else {
                return item

            }
        })

        return {
            ...state,
            cart: updateCart
        }
    }

    if (action.type === 'decrease-quantity') {

        const updateCart = state.cart.map(item => {
            if (item.id === action.payload.id && item.quantity > MIN_ITEMS) {

                return {
                    ...item,
                    quantity: item.quantity - 1
                }

            }

            return item
        })
        return {
            ...state,
            cart: updateCart
        }
    }

    if (action.type === 'clear-cart') {

        return {
            ...state,
            cart: []
        }
    }

    return state

}