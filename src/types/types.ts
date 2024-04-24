export type Guitar = {
    id: number
    name: string
    image: string
    description: string
    price: number
}

//* Herencia en Type
export type CartItem = Guitar & {
    quantity: number
}

// Utility Types
//* Pick agrega atributos al nuevo Type
// Sirve para agregar los atributos que necesitemos
// export type CartItem = Pick<Guitar, 'id' | 'name' | 'price'> & {
//     quantity: number
// }

//* Omit agrega atributos al nuevo Type
// Sirve para quitar los atributos que NO necesitemos
// export type CartItem = Omit<Guitar, 'image' | 'description'> & {
//     quantity: number
// }