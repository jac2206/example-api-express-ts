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
};
