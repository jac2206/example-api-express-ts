import { Request, Response } from "express";
import { UserRequestDTO, UserResponseDTO } from "../dto/example.dto";
import { IUserInterface } from "../services/interfaces/users.interface";

export class UserController {
    constructor(
        readonly userService: IUserInterface
    ) {}

    // async createUser(req:Request, res:Response):Promise<void>{
    //     const request: UserRequestDTO = req.body as UserRequestDTO 
    //     if (!request.name) {
    //         res.status(400).json({
    //             code: "BAD_REQUEST",
    //             message: "name not exist"
    //         });
    //     };

    //     const result = await this.userService.createUser(request);
    //     res.status(200).json(result);       
    // }

    createUser = async (
        req: Request,
        res: Response,
    ): Promise<void> => {
        const request: UserRequestDTO = req.body as UserRequestDTO;
        const result = await this.userService.createUser(request);
        res.status(200).json(result);
    };

    updateUser = async (
        req: Request,
        res: Response,
    ): Promise<void> => {
        const userId: string = req.params.id as string;
        const request: UserRequestDTO = req.body as UserRequestDTO;
        const result = await this.userService.updateUser(request, userId);
        res.status(200).json(result);
    }; 
}