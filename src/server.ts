import express, { Request, Response } from "express";
import { UserRequestDTO, UserResponseDTO } from "./dto/example.dto";
import { scopePerRequest } from "awilix-express";
import { container } from "./config/container";
import { UserService } from "./services/users.service";
import { TransactionsService, TransactionStatus, TypePayment } from "./services/transactions.service";
import { TransactionsRequestDTO } from "./dto/transactions.dto";
import { TransactionsFilters } from "./services/interfaces/transactions.interface";

export const createServer = () => {

    const app = express();

    app.use(express.json());

    app.use(scopePerRequest(container));

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

    app.post("/users", async (req, res)=> {

        const request: UserRequestDTO = req.body as UserRequestDTO 
        if (!request.name) {
            return res.status(400).json({
                code: "BAD_REQUEST",
                message: "name not exist"
            });
        };
        const serviceUser =  container.resolve<UserService>("userService")
        const result = await serviceUser.createUser(request);
        res.status(200).json(result);

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

    app.get("/transactions", async (req, res) => {
        const filters: TransactionsFilters = {
            status: req.query.status as TransactionStatus | undefined,
            typePayment: req.query.typePayment as TypePayment | undefined,
            sort: req.query.sort as "accumulate" | undefined,
        };

        const serviceTransaction =
            container.resolve<TransactionsService>("transactionsService");

        const result = await serviceTransaction.getTransactions(filters);

        res.status(200).json(result);
    });

    app.get("/transactions/:id", async (req, res) => {
        const id: number = Number(req.params.id);
        const serviceTransaction = container.resolve<TransactionsService>("transactionsService")
        const result = await serviceTransaction.getTransactionXId(id);
        if ("code" in result) {
            res.status(400).json(result);
        }
        res.status(200).json(result);
    });

    app.post("/transactions", async (req, res) => {
        const request: TransactionsRequestDTO = req.body as TransactionsRequestDTO;
        const serviceTransaction = container.resolve<TransactionsService>("transactionsService")
        const result = await serviceTransaction.createPaymentTransaction(request);
        if ("code" in result) {
            res.status(422).json(result);
        }
        res.status(200).json(result);
    });

    return app

}