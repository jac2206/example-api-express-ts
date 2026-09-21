import { Router } from "express";
import usersRoutes from "./users.route";
import transactionsRoutes from "./transactions.route"

const router = Router();

router.use("/users", usersRoutes);
router.use("/transactions", transactionsRoutes);

export default router;