import { Transactions } from "../data/models/transactions.model";
import { transactionData } from "../data/trasnsactions.data";
import { ErrorResponseDTO } from "../dto/example.dto";
import { TransactionsRequestDTO, TransactionsResponseDTO } from "../dto/transactions.dto";
import { ITransactionsService, TransactionsFilters } from "./interfaces/transactions.interface";

export enum TypePayment {
  CREDIT_CARD = "CC",
  DEBIT_CARD = "DC",
  CASH = "MN",
}

export enum TransactionStatus {
  SUCCESS = "SUCCESS",
  FAILED = "FAILED",
}

export class TransactionsService implements ITransactionsService{
    constructor(){}

    async getTransactions(filters?: TransactionsFilters): Promise<TransactionsResponseDTO[]> {

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

    async getTransactionXId(id:number): Promise<TransactionsResponseDTO | ErrorResponseDTO> {
        if (Number.isNaN(id)) {
            const error: ErrorResponseDTO = {
                code: "INVALID_ID",
                message: "The transaction id must be a number"
            } 
            return error;
        }
     
        const transaction: TransactionsResponseDTO =
         transactionData.find((transaction) => transaction.id === id) as TransactionsResponseDTO;

        if (!transaction) {
            return {
            code: "TRANSACTION_NOT_FOUND",
            message: "Transaction not found",
            };
        }

        return transaction
    }

    async createPaymentTransaction( transaction: TransactionsRequestDTO): Promise<TransactionsResponseDTO | ErrorResponseDTO> {

        if (typeof transaction.amount !== "number") {
            return {
            code: "INVALID_AMOUNT",
            message: "The amount must be a number",
            };
        }


        const lastTransaction = transactionData[transactionData.length - 1];
        const newId = lastTransaction.id + 1;
        const accumulate = Math.floor(transaction.amount / 1000);

        const newTransaction: Transactions = {
            id: newId,
            amount: transaction.amount,
            accumulate: accumulate,
            typePayment: transaction.typePayment,
            status: TransactionStatus.SUCCESS,
        };

        transactionData.push(newTransaction);

        const transactionsResult: TransactionsResponseDTO = {
            id: newTransaction.id,
            amount: newTransaction.amount,
            accumulate: newTransaction.accumulate,
            typePayment: newTransaction.typePayment,
            status: newTransaction.status,
        }

        return transactionsResult;
    }

}