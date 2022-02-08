interface Response {
  status: string;
  statusCode: number;
  message: string;
}

export const generateResponse = (
  statusCode: number,
  message: string
): Response => {
  return {
    status: 'success',
    statusCode,
    message,
  };
};

export const generateErrorMessage = (customError: any): Response => {
  const errorResponse = {
    status: 'error',
    statusCode: customError.code,
    message: customError.message,
  };
  return errorResponse;
};
