import { UserRequestDTO, UserResponseDTO } from "../dto/example.dto";
import { IUserInterface } from "./interfaces/users.interface";

export class UserService implements IUserInterface {
    constructor(){}

    async createUser(user: UserRequestDTO): Promise<UserResponseDTO>{
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

}