export const TOO_MANY_REQUESTS_ERROR = {
  error: 'Too Many Request, Please try after some time!',
};

export const SERVER_ERROR = { code: 500, message: 'Internal Server error' };

export const UNAUTHORIZED_ERROR = {
  code: 401,
  message: "Stop! Unautorized access, You can't proceed further",
};

export const BAD_REQUEST = {
  code: 400,
  message: 'Uh,oh! The request is badly made',
};

export const INVALID_RECAPTCHA_CODE = {
  code: 401,
  message: 'Invalid recaptcha code',
};
