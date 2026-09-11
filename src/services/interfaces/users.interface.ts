import { UserRequestDTO, UserResponseDTO } from "../../dto/example.dto";


export interface IUserInterface {
    createUser(user: UserRequestDTO): Promise<UserResponseDTO>;
    updateUser(user: UserRequestDTO, userId: string): Promise<UserResponseDTO>;
}