export interface TransactionsRequestDTO {
    amount: number,
    typePayment: string
}

export interface TransactionsResponseDTO {
    id: number,
    amount: number,
    accumulate: number,
    typePayment: string,
    status: string
}