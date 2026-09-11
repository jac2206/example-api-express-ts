export interface UserRequestDTO {
    name: string,
    lastName: string,
    age: number
}

export interface UserResponseDTO {
    id: string,
    name: string,
    lastName: string,
    fullName: string
    age: number
    status: boolean
}