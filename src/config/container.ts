import { createContainer, asClass, InjectionMode } from "awilix";
import { UserService } from "../services/users.service";

export const container = createContainer({
  injectionMode: InjectionMode.CLASSIC,
});

container.register({

  userService: asClass(UserService).scoped()
    
})