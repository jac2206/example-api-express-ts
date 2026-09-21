import { Transactions } from "../../data/models/transactions.model";
import { TransactionsFilters } from "../../services/interfaces/transactions.interface";

export interface ITransactionsRepository {
    getTransactionsXFilters(filters?:TransactionsFilters):Promise<Transactions[]>
}