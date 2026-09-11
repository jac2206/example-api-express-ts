import { Router } from "express";
import { container } from "../../config/container";
import { UserController } from "../../controllers/user.controller";

const router = Router();

router.post("/", async (req, res) => {
    const controller =
        container.resolve<UserController>("UserController");
    return controller.createUser(req, res);
});


router.patch("/:id", async (req, res) => {
    const controller =
        container.resolve<UserController>("UserController");
    return controller.updateUser(req, res);
});

export default router;