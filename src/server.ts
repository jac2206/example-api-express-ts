import express, { Request, Response } from "express";
import { UserRequestDTO, UserResponseDTO } from "./dto/example.dto";

export const createServer = () => {

    const app = express();

    app.use(express.json());

    app.get("/", (req, res) => {
        res.status(200).json({
            message: "Server Running"
        })
    });

    app.get("/health",(req, res) => {
        res.status(200).json({
            status: true,
            serviceName: "example-api-back"
        })
    });

    app.post("/users", (req, res)=> {

        const request: UserRequestDTO = req.body as UserRequestDTO 
        if (!request.name) {
            return res.status(400).json({
                code: "BAD_REQUEST",
                message: "name not exist"
            });
        };
        const response: UserResponseDTO = {
            id : "1234",
            name: request.name,
            lastName: request.lastName,
            fullName: request.name + " " + request.lastName,
            age: request.age,
            status: true
        }
        res.status(200).json(response);

    }); 

    app.patch("/users/:id", (req, res)=> {

        const userId: string = req.params.id;
        const request: UserRequestDTO = req.body as UserRequestDTO 
        if (!request.name) {
            return res.status(400).json({
                code: "BAD_REQUEST",
                message: "name not exist"
            });
        };
        const response: UserResponseDTO = {
            id : userId,
            name: request.name,
            lastName: request.lastName,
            fullName: request.name + " " + request.lastName,
            age: request.age,
            status: true
        };
        res.status(200).json(response);

    }); 

    return app

}