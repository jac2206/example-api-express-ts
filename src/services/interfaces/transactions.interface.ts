import { TransactionsRequestDTO, TransactionsResponseDTO } from "../../dto/transactions.dto";
import { TransactionStatus, TypePayment } from "../transactions.service";

export interface TransactionsFilters {
  status?: TransactionStatus;
  typePayment?: TypePayment;
  sort?: "accumulate";
}

export interface ITransactionsService {
    getTransactions(filters?: TransactionsFilters): Promise<TransactionsResponseDTO[]>
    getTransactionXId(id: number):Promise<TransactionsResponseDTO>
    createPaymentTransaction(transaction: TransactionsRequestDTO):Promise<TransactionsResponseDTO>
}