import { createContainer, asClass, InjectionMode } from "awilix";
import { UserService } from "../services/users.service";
import { UserController } from "../controllers/user.controller";
import { HealthController } from "../controllers/health.controller";

export const container = createContainer({
  injectionMode: InjectionMode.CLASSIC,
});

container.register({
  //controllers
  UserController: asClass(UserController).scoped(),
  healthController: asClass(HealthController).scoped(),

  //services
  userService: asClass(UserService).scoped()
    
})