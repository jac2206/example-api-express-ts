import express, { Request, Response } from "express";
import { UserRequestDTO, UserResponseDTO } from "./dto/example.dto";
import { scopePerRequest } from "awilix-express";
import { container } from "./config/container";
import { UserService } from "./services/users.service";
import V1Router from "./routes/v1";
import healtRouter from "./routes/health.route"
import { errorMiddleware } from "./middleware/error.middleware";

export const createServer = () => {

    const prefix = "/example-api";

    const app = express();

    app.use(express.json());

    app.use(scopePerRequest(container));

    app.use(`${prefix}/v1`, V1Router);
    app.use(`${prefix}/health`, healtRouter);

    app.use((req, res) => {
        res.status(404).json({
        message: "Route not found",
        code: 404,
        });
    });

    app.use(errorMiddleware);

    return app

}