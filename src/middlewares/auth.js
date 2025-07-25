const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const { User } = require("../models");
const config = require("../config/config");
const { formatResponse } = require("../utils/responseFormatter");

const authenticate = asyncHandler(async (req, res, next) => {
  let token;
  const auth = req.headers.authorization;
  if (auth && auth.startsWith("Bearer ")) {
    token = auth.split(" ")[1];
    try {
      const decoded = jwt.verify(token, config.jwt.secret);
      const user = await User.findByPk(decoded.id, {
        attributes: { exclude: ["password"] },
      });
      if (!user || !user.is_active) {
        return res
          .status(401)
          .json(formatResponse(false, "User not found or inactive"));
      }
      req.user = user;
      return next();
    } catch (err) {
      return res
        .status(401)
        .json(formatResponse(false, "Invalid or expired token"));
    }
  }
  return res.status(401).json(formatResponse(false, "No token provided"));
});

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json(formatResponse(false, "Access denied"));
    }
    next();
  };
};

module.exports = { authenticate, authorize };
