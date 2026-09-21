import { Router } from "express";
import { container } from "../../config/container";
import { TransactionsController } from "../../controllers/transactions.controller";

const router = Router();

router.get("/", async (req, res) => {
    try{
    const controller =
        container.resolve<TransactionsController>("transactionsController");
    return controller.getTransactions(req, res);
    }
    catch(err){
        console.log(err);
    }
});

router.post("/", async (req, res) => {
  const controller =
    container.resolve<TransactionsController>("transactionsController");
  return controller.createPaymentTransaction(req, res);
});

router.get("/:id", async (req, res) => {
  const controller =
    container.resolve<TransactionsController>("transactionsController");
  return controller.getTransactionXId(req, res);
});


export default router;