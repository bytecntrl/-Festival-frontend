

export interface ProductsAddForm {
    name: string
    price: string
    category: string
    subcategory: string
    roles: string[]
    variants: { name: string, price: number }[]
    ingredients: { name: string, price: number }[]
}


export interface Product {
    id: number
    name: string
    price: number
    category: string
    subcategory_id: number
}


export interface ProductsGet {
    error: boolean
    message: string
    products: {[name: string]: Product[]}
}
