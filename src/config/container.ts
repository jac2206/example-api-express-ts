import { createContainer, asClass, InjectionMode } from "awilix";
import { UserService } from "../services/users.service";
import { TransactionsService } from "../services/transactions.service";

export const container = createContainer({
  injectionMode: InjectionMode.CLASSIC,
});

container.register({

  userService: asClass(UserService).scoped(),
  transactionsService: asClass(TransactionsService).scoped()
    
})