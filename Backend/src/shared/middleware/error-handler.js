const { AppError } = require("../errors/app-error");
const { error } = require("../http/response");

function notFoundHandler(req, res) {
  return error(res, 404, "NOT_FOUND", "Route not found");
}

function errorHandler(err, req, res, next) {
  if (err instanceof AppError) {
    return error(res, err.statusCode, err.code, err.message);
  }

  console.error("Unhandled error", {
    requestId: res.locals.requestId || null,
    message: err.message,
    stack: err.stack,
  });

  return error(res, 500, "INTERNAL_ERROR", "Internal server error");
}

module.exports = {
  notFoundHandler,
  errorHandler,
};
