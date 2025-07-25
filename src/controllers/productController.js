const asyncHandler = require("express-async-handler");
const productService = require("../services/productService");
const { formatResponse } = require("../utils/responseFormatter");

const productController = {
  createProduct: asyncHandler(async (req, res) => {
    const product = await productService.createProduct(req.body);
    res
      .status(201)
      .json(formatResponse(true, "Product created successfully", product));
  }),

  getAllProducts: asyncHandler(async (req, res) => {
    const result = await productService.getAllProducts(req.query);
    res.json(formatResponse(true, "Products retrieved successfully", result));
  }),

  getProductById: asyncHandler(async (req, res) => {
    const product = await productService.getProductById(req.params.id);
    res.json(formatResponse(true, "Product retrieved successfully", product));
  }),

  updateProduct: asyncHandler(async (req, res) => {
    const product = await productService.updateProduct(req.params.id, req.body);
    res.json(formatResponse(true, "Product updated successfully", product));
  }),

  deleteProduct: asyncHandler(async (req, res) => {
    await productService.deleteProduct(req.params.id);
    res.json(formatResponse(true, "Product deleted successfully"));
  }),
};

module.exports = productController;
