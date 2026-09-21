import { Request, Response } from "express";

export class HealthController {
    constructor(){}

    health = async ( 
        req:Request, 
        res:Response
    ):Promise<void> => {
        res.status(200).json({
            status: true,
            serviceName: "example-api-back"
        })
    }
}