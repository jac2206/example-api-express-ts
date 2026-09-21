import { Transactions } from "../data/models/transactions.model";
import { transactionData } from "../data/trasnsactions.data";
import {
  TransactionsRequestDTO,
  TransactionsResponseDTO,
} from "../dto/transactions.dto";
import { AppExeption } from "../exceptions/app.exception";
import { AppErros } from "../exceptions/errors/app.error";
import {
  ITransactionsService,
  TransactionsFilters,
} from "./interfaces/transactions.interface";

export enum TypePayment {
  CREDIT_CARD = "CC",
  DEBIT_CARD = "DC",
  CASH = "MN",
}

export enum TransactionStatus {
  SUCCESS = "SUCCESS",
  FAILED = "FAILED",
}

export class TransactionsService implements ITransactionsService {
  constructor() {}

  async getTransactions(
    filters?: TransactionsFilters,
  ): Promise<TransactionsResponseDTO[]> {
    let transactions = transactionData;

    if (filters?.status) {
      transactions = transactions.filter(
        (transaction) => transaction.status === filters.status,
      );
    }

    if (filters?.typePayment) {
      transactions = transactions.filter(
        (transaction) => transaction.typePayment === filters.typePayment,
      );
    }

    if (filters?.sort === "accumulate") {
      transactions = [...transactions].sort(
        (a, b) => b.accumulate - a.accumulate,
      );
    }

    return transactions.map((transaction) => ({
      id: transaction.id,
      amount: transaction.amount,
      accumulate: transaction.accumulate,
      typePayment: transaction.typePayment,
      status: transaction.status,
    }));
  }

  async getTransactionXId(
    id: number,
  ): Promise<TransactionsResponseDTO> {
    if (Number.isNaN(id)) {
      const error = AppErros.TRANSACTION_INVALID_ID;

      throw new AppExeption(
        error.code,
        error.message,
        error.statusCode,
      );
    }

    const transaction = transactionData.find(
      (transaction) => transaction.id === id,
    );

    if (!transaction) {
      const error = AppErros.TRANSACTION_NOT_FOUND;

      throw new AppExeption(
        error.code,
        error.message,
        error.statusCode,
      );
    }

    return {
      id: transaction.id,
      amount: transaction.amount,
      accumulate: transaction.accumulate,
      typePayment: transaction.typePayment,
      status: transaction.status,
    };
  }

  async createPaymentTransaction(
    transaction: TransactionsRequestDTO,
  ): Promise<TransactionsResponseDTO> {
    if (typeof transaction.amount !== "number") {
      const error = AppErros.TRANSACTION_INVALID_AMOUNT;

      throw new AppExeption(
        error.code,
        error.message,
        error.statusCode,
      );
    }

    const lastTransaction =
      transactionData[transactionData.length - 1];

    const newId = lastTransaction.id + 1;

    const accumulate = Math.floor(transaction.amount / 1000);

    const newTransaction: Transactions = {
      id: newId,
      amount: transaction.amount,
      accumulate,
      typePayment: transaction.typePayment,
      status: TransactionStatus.SUCCESS,
    };

    transactionData.push(newTransaction);

    return {
      id: newTransaction.id,
      amount: newTransaction.amount,
      accumulate: newTransaction.accumulate,
      typePayment: newTransaction.typePayment,
      status: newTransaction.status,
    };
  }
}