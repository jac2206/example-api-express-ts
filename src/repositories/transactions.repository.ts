import { Transactions } from "../data/models/transactions.model";
import { transactionData } from "../data/trasnsactions.data";
import { TransactionsFilters } from "../services/interfaces/transactions.interface";
import { ITransactionsRepository } from "./interfaces/transactions.interface";

export class TransactionsRepository implements ITransactionsRepository {
    constructor(){}
    
    async getTransactionsXFilters(filters?: TransactionsFilters): Promise<Transactions[]> {
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
        
        return await this.mapTransactions(transactions);
    }

    private async mapTransactions(transactions:Transactions[]): Promise<Transactions[]> {
        return transactions.map((transaction) => ({
        id: transaction.id,
        amount: transaction.amount,
        accumulate: transaction.accumulate,
        typePayment: transaction.typePayment,
        status: transaction.status,
        }));
    }
    

}