import express from "express";
import { scopePerRequest } from "awilix-express";
import { container } from "./config/container";
import V1Router from "./routes/v1";
import healtRouter from "./routes/health.route"
import { errorMiddleware } from "./middlewares/error.middleware";

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