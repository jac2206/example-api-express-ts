import { UserRequestDTO, UserResponseDTO } from "../dto/example.dto";
import { AppExeption } from "../exceptions/app.exception";
import { AppErros } from "../exceptions/errors/app.error";
import { IUserInterface } from "./interfaces/users.interface";

export class UserService implements IUserInterface {
    constructor(){}

    async createUser(user: UserRequestDTO): Promise<UserResponseDTO>{
        if (!user.name) {
            const error = AppErros.NAME_NOT_FOUND
            throw new AppExeption(error.code, error.message, error.statusCode); 
        }
        
        const response: UserResponseDTO = {
            id : "123132",
            name: user.name,
            lastName: user.lastName,
            fullName: user.name + " " + user.lastName,
            age: user.age,
            status: true,
        };
        return response
    }

    async updateUser(user: UserRequestDTO, userId: string): Promise<UserResponseDTO> {
        if (!user.name) {
           const error = AppErros.NAME_NOT_FOUND
           throw new AppExeption(error.code, error.message, error.statusCode); 
        }
        const response: UserResponseDTO = {
            id : userId,
            name: user.name,
            lastName: user.lastName,
            fullName: user.name + " " + user.lastName,
            age: user.age,
            status: true
        };
        return response
    }
    
}