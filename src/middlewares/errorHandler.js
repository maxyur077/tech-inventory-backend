const { formatResponse } = require("../utils/responseFormatter");

function errorHandler(err, req, res, next) {
  // Preserve statusCode if set, otherwise default to 500
  const statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  // Handle Sequelize errors
  if (err.name === "SequelizeValidationError") {
    message = err.errors.map((e) => e.message).join(", ");
  }
  if (err.name === "SequelizeUniqueConstraintError") {
    message = err.errors.map((e) => e.message).join(", ");
  }
  if (err.name === "SequelizeForeignKeyConstraintError") {
    message = "Invalid reference: " + (err.index || "");
  }
  // JWT errors
  if (err.name === "JsonWebTokenError") {
    return res.status(401).json(formatResponse(false, "Invalid token"));
  }
  if (err.name === "TokenExpiredError") {
    return res.status(401).json(formatResponse(false, "Token expired"));
  }

  console.error(err);
  res.status(statusCode).json(formatResponse(false, message));
}

module.exports = errorHandler;
