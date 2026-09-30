export const transactionsErrors = {
    TRANSACTION_INVALID_ID: {
    code: "TRANSACTION_INVALID_ID",
    message: "The transaction id must be a number",
    statusCode: 400,
  },

  TRANSACTION_NOT_FOUND: {
    code: "TRANSACTION_NOT_FOUND",
    message: "Transaction not found",
    statusCode: 404,
  },

  TRANSACTION_INVALID_AMOUNT: {
    code: "TRANSACTION_INVALID_AMOUNT",
    message: "The amount must be a number",
    statusCode: 400,
  }
}