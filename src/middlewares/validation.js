const Joi = require("joi");
const { formatResponse } = require("../utils/responseFormatter");

const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, {
      abortEarly: false,
      allowUnknown: false,
    });
    if (error) {
      const message = error.details.map((d) => d.message).join(", ");
      return res.status(400).json(formatResponse(false, message));
    }
    next();
  };
};

const schemas = {
  product: Joi.object({
    name: Joi.string().min(2).max(255).required(),
    price: Joi.number().positive().precision(2).required(),
    description: Joi.string().allow("", null),
    category: Joi.string().max(100).allow("", null),
    stock_quantity: Joi.number().integer().min(0).optional(),
  }),
  productUpdate: Joi.object({
    name: Joi.string().min(2).max(255),
    price: Joi.number().positive().precision(2),
    description: Joi.string().allow("", null),
    category: Joi.string().max(100).allow("", null),
    stock_quantity: Joi.number().integer().min(0),
  }),
  userRegister: Joi.object({
    username: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  }),
  userLogin: Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
  }),
  userUpdate: Joi.object({
    username: Joi.string().min(3).max(50),
    email: Joi.string().email(),
    password: Joi.string().min(6).allow("", null),
  }),
  order: Joi.object({
    product_ids: Joi.array()
      .items(Joi.number().integer().positive())
      .min(1)
      .required(),
    total_amount: Joi.number().positive().precision(2).required(),
  }),
  orderUpdate: Joi.object({
    status: Joi.string().valid(
      "pending",
      "confirmed",
      "shipped",
      "delivered",
      "cancelled"
    ),
    total_amount: Joi.number().positive().precision(2),
  }),
};

module.exports = { validate, schemas };
