

export interface ProductsAddForm {
    name: string
    price: string
    category: string
    subcategory: string
    roles: string[]
    variants: { name: string, price: number }[]
    ingredients: { name: string, price: number }[]
}
