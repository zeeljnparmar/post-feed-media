//Standard error handling function.

export const errorResponse = (res, statusCode = 400, message = "internal_error", details = {}) => {
  return res.status(statusCode).json({
    error: message,
    ...details
  });
};
