import { UserRequestDTO, UserResponseDTO } from "../dto/example.dto";
import { IUserInterface } from "./interfaces/users.interface";

export class UserService implements IUserInterface {
    constructor(){}

    async createUser(user: UserRequestDTO): Promise<UserResponseDTO>{
        if (!user.name) {
            throw {
                status: 400,
                code: "NAME_IS_REQUIRED",
                message: "Name is required",
            };
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
            throw {
                status: 400,
                code: "BAD_REQUEST",
                message: "Name is required",
            };
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