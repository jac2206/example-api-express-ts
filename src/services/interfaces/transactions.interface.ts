import { ErrorResponseDTO } from "../../dto/example.dto";
import { TransactionsRequestDTO, TransactionsResponseDTO } from "../../dto/transactions.dto";
import { TransactionStatus, TypePayment } from "../transactions.service";

export interface TransactionsFilters {
  status?: TransactionStatus;
  typePayment?: TypePayment;
  sort?: "accumulate";
}

export interface ITransactionsService {
    getTransactions(filters?: TransactionsFilters): Promise<TransactionsResponseDTO[]>
    getTransactionXId(id: number):Promise<TransactionsResponseDTO | ErrorResponseDTO>
    createPaymentTransaction(transaction: TransactionsRequestDTO):Promise<TransactionsResponseDTO | ErrorResponseDTO>
}