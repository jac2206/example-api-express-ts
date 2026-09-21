import { Request, Response } from "express";
import {
  TransactionsRequestDTO,
  TransactionsResponseDTO,
} from "../dto/transactions.dto";
import {
  TransactionsFilters,
  ITransactionsService,
} from "../services/interfaces/transactions.interface";
import {
  TransactionStatus,
  TypePayment,
} from "../services/transactions.service";

export class TransactionsController {
  constructor(
    readonly transactionsService: ITransactionsService,
  ) {}

  getTransactions = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    const filters: TransactionsFilters = {
      status: req.query.status as TransactionStatus | undefined,
      typePayment: req.query.typePayment as TypePayment | undefined,
      sort: req.query.sort as "accumulate" | undefined,
    };

    const result =
      await this.transactionsService.getTransactions(filters);

    res.status(200).json(result);
  };

  getTransactionXId = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    const id = Number(req.params.id);

    const result =
      await this.transactionsService.getTransactionXId(id);

    res.status(200).json(result);
  };

  createPaymentTransaction = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    const request: TransactionsRequestDTO =
      req.body as TransactionsRequestDTO;

    const result =
      await this.transactionsService.createPaymentTransaction(
        request,
      );

    res.status(201).json(result);
  };
}