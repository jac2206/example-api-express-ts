export const AppErros = {
  NAME_NOT_FOUND: {
    code: "NAME_NOT_FOUND",
    message: "Name is required",
    statusCode: 400,
  },

  USER_INVALID_DATA: {
    code: "USER_INVALID_DATA",
    message: "Invalid product data",
    statusCode: 422,
  },

  USER_ID_MANDATORY: {
    code: "USER_ID_MANDATORY",
    message: "Product id is mandatory",
    statusCode: 400,
  },

  POKEMON_NOT_FOUND: {
    code: "POKEMON_NOT_FOUND",
    message: "Pokemon not exist",
    statusCode: 404,
  },

  API_EXTERNAL_ERROR: {
    code: "EXTERNAL_SERVICE_ERROR",
    message: "Extenal API error",
    statusCode: 502,
  },

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
  },
};