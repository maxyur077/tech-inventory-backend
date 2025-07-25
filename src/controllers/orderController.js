const asyncHandler = require("express-async-handler");
const orderService = require("../services/orderService");
const { formatResponse } = require("../utils/responseFormatter");

const orderController = {
  createOrder: asyncHandler(async (req, res) => {
    req.body.user_id = req.user.id; // Set user_id from authenticated user
    const order = await orderService.createOrder(req.body);
    res
      .status(201)
      .json(formatResponse(true, "Order created successfully", order));
  }),

  getAllOrders: asyncHandler(async (req, res) => {
    const filters = { ...req.query };

    const result = await orderService.getAllOrders(filters);
    res.json(formatResponse(true, "Orders retrieved successfully", result));
  }),

  getOrderById: asyncHandler(async (req, res) => {
    const order = await orderService.getOrderById(req.params.id);

    res.json(formatResponse(true, "Order retrieved successfully", order));
  }),

  updateOrder: asyncHandler(async (req, res) => {
    const order = await orderService.getOrderById(req.params.id);

    const updatedOrder = await orderService.updateOrder(
      req.params.id,
      req.body
    );
    res.json(formatResponse(true, "Order updated successfully", updatedOrder));
  }),

  deleteOrder: asyncHandler(async (req, res) => {
    const order = await orderService.getOrderById(req.params.id);

    await orderService.deleteOrder(req.params.id);
    res.json(formatResponse(true, "Order deleted successfully"));
  }),
};

module.exports = orderController;
