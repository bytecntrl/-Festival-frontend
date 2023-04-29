

export interface ProductsAddForm {
    name: string
    price: string
    category: string
    subcategory: string
    roles: string[]
    variants: { name: string, price: number }[]
    ingredients: { name: string, price: number }[]
}

export interface ProductsEditForm {
    price: string
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
    roles: string[] | undefined
    variant: { id: number, name: string, price: number }[] | undefined
    ingredient: { id: number, name: string, price: number }[] | undefined
}


export interface ProductsGet {
    error: boolean
    message: string
    products: {[name: string]: Product[]}
}

export interface ProductsGetById {
    error: boolean
    message: string
    product: Product
}
