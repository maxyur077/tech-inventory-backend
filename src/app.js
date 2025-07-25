const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const config = require("./config/config");
const errorHandler = require("./middlewares/errorHandler");
const routes = require("./routes");
const { formatResponse } = require("./utils/responseFormatter");

const app = express();

app.use(helmet());

app.use(
  cors({
    origin: config.cors.origin,
    credentials: true,
  })
);

const limiter = rateLimit({
  windowMs: config.rateLimit.windowMs,
  max: config.rateLimit.maxRequests,
  message: formatResponse(false, "Too many requests, please try again later"),
});
app.use(limiter);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.use(`/api/${config.apiVersion}`, routes);

app.use("*", (req, res) => {
  res.status(404).json(formatResponse(false, "Route not found"));
});

app.use(errorHandler);

module.exports = app;
