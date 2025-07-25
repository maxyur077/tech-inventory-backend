const productController = require("../../../src/controllers/productController");
const productService = require("../../../src/services/productService");
const { formatResponse } = require("../../../src/utils/responseFormatter");

jest.mock("../../../src/services/productService");

jest.mock("../../../src/utils/responseFormatter", () => ({
  formatResponse: jest.fn((success, message, data) => ({
    success,
    message,
    data,
  })),
}));

describe("ProductController", () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      body: {},
      params: {},
      query: {},
      user: { id: 1, role: "user" },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
    jest.clearAllMocks();
  });

  describe("createProduct", () => {
    it("should create a product successfully", async () => {
      const productData = {
        name: "Test Product",
        price: 99.99,
        description: "Test Description",
      };
      const mockProduct = { id: 1, ...productData };

      req.body = productData;
      productService.createProduct.mockResolvedValue(mockProduct);

      await productController.createProduct(req, res, next);

      expect(productService.createProduct).toHaveBeenCalledWith(productData);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: "Product created successfully",
        data: mockProduct,
      });
    });

    it("should handle errors", async () => {
      const error = new Error("Database error");
      req.body = { name: "Test Product", price: 99.99 };
      productService.createProduct.mockRejectedValue(error);

      await productController.createProduct(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe("getAllProducts", () => {
    it("should get all products with pagination", async () => {
      const mockResult = {
        products: [{ id: 1, name: "Product 1" }],
        pagination: { page: 1, limit: 10, total: 1, pages: 1 },
      };

      req.query = { page: 1, limit: 10 };
      productService.getAllProducts.mockResolvedValue(mockResult);

      await productController.getAllProducts(req, res, next);

      expect(productService.getAllProducts).toHaveBeenCalledWith(req.query);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: "Products retrieved successfully",
        data: mockResult,
      });
    });
  });

  describe("getProductById", () => {
    it("should get a product by ID", async () => {
      const mockProduct = { id: 1, name: "Test Product" };
      req.params.id = "1";
      productService.getProductById.mockResolvedValue(mockProduct);

      await productController.getProductById(req, res, next);

      expect(productService.getProductById).toHaveBeenCalledWith("1");
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: "Product retrieved successfully",
        data: mockProduct,
      });
    });
  });

  describe("updateProduct", () => {
    it("should update a product", async () => {
      const updateData = { name: "Updated Product" };
      const mockProduct = { id: 1, ...updateData };

      req.params.id = "1";
      req.body = updateData;
      productService.updateProduct.mockResolvedValue(mockProduct);

      await productController.updateProduct(req, res, next);

      expect(productService.updateProduct).toHaveBeenCalledWith(
        "1",
        updateData
      );
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: "Product updated successfully",
        data: mockProduct,
      });
    });
  });

  describe("deleteProduct", () => {
    it("should delete a product", async () => {
      req.params.id = "1";
      productService.deleteProduct.mockResolvedValue();

      await productController.deleteProduct(req, res, next);

      expect(productService.deleteProduct).toHaveBeenCalledWith("1");
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: "Product deleted successfully",
      });
    });
  });
});
