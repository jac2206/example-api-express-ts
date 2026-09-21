import { createContainer, asClass, InjectionMode } from "awilix";
import { UserService } from "../services/users.service";
import { UsersController } from "../controllers/users.controller";
import { HealthController } from "../controllers/health.controller";
import { TransactionsController } from "../controllers/transactions.controller";
import { TransactionsService } from "../services/transactions.service";
import { TransactionsRepository } from "../repositories/transactions.repository";

export const container = createContainer({
  injectionMode: InjectionMode.CLASSIC,
});

container.register({
  //controllers
  usersController: asClass(UsersController).scoped(),
  healthController: asClass(HealthController).scoped(),
  transactionsController: asClass(TransactionsController).scoped(),

  //services
  userService: asClass(UserService).scoped(),
  transactionsService: asClass(TransactionsService).scoped(),

  //repository
  transactionsRepository: asClass(TransactionsRepository).scoped()
    
})