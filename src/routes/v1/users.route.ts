import { Router } from "express";
import { container } from "../../config/container";
import { UsersController } from "../../controllers/users.controller";

const router = Router();

router.post("/", async (req, res) => {
    const controller =
        container.resolve<UsersController>("usersController");
    return controller.createUser(req, res);
});


router.patch("/:id", async (req, res) => {
    const controller =
        container.resolve<UsersController>("usersController");
    return controller.updateUser(req, res);
});

export default router;