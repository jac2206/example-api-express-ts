import { Transactions } from "../data/models/transactions.model";

export const transactionData: Transactions[] = [
    {id: 1, amount:2000, accumulate: 2,typePayment: "CC", status: "SUCCES"},
    {id: 2, amount:500, accumulate: 0,typePayment: "DC", status: "SUCCES"},
    {id: 3, amount:1000, accumulate: 1,typePayment: "MN", status: "SUCCES"}
]