

export interface User {
    id: number
    username: string
    role: string
}


export interface UserResponse {
    error: boolean
    message: string
    users: User[]
    page: number
}
