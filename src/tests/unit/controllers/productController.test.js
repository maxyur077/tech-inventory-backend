const productController = require("../../../controllers/productController");
const productService = require("../../../services/productService");
const { formatResponse } = require("../../../utils/responseFormatter");

jest.mock("../../../services/productService", () => ({
  createProduct: jest.fn(),
  getProductById: jest.fn(),
  updateProduct: jest.fn(),
  deleteProduct: jest.fn(),
}));

jest.mock("../../../utils/responseFormatter", () => ({
  formatResponse: jest.fn((success, message, data) => ({
    success,
    message,
    data,
    timestamp: new Date().toISOString(),
  })),
}));

describe("ProductController", () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      body: {},
      params: {},
      query: {},
      user: { id: 1, username: "testuser" },
    };
    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
    next = jest.fn();
    jest.clearAllMocks();
  });

  describe("createProduct", () => {
    it("should create product successfully", async () => {
      const productData = {
        name: "Test Product",
        price: 99.99,
        description: "Test description",
        category: "test",
        stock_quantity: 10,
      };

      const createdProduct = {
        id: 1,
        ...productData,
        is_active: true,
        created_at: new Date(),
      };

      req.body = productData;
      productService.createProduct.mockResolvedValue(createdProduct);

      await productController.createProduct(req, res);

      expect(productService.createProduct).toHaveBeenCalledWith(productData);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(formatResponse).toHaveBeenCalledWith(
        true,
        "Product created successfully",
        createdProduct
      );
      expect(res.json).toHaveBeenCalled();
    });

    it("should handle product creation error", async () => {
      const productData = {
        name: "Test Product",
        price: 99.99,
        stock_quantity: 10,
      };

      const error = new Error("Database error");
      req.body = productData;
      productService.createProduct.mockRejectedValue(error);

      await expect(productController.createProduct(req, res)).rejects.toThrow(
        "Database error"
      );
    });
  });

  describe("getProductById", () => {
    it("should get product by id successfully", async () => {
      const mockProduct = {
        id: 1,
        name: "Test Product",
        price: 99.99,
        is_active: true,
      };

      req.params.id = "1";
      productService.getProductById.mockResolvedValue(mockProduct);

      await productController.getProductById(req, res);

      // ✅ Fix: Expect string "1" since params are strings
      expect(productService.getProductById).toHaveBeenCalledWith("1");
      expect(formatResponse).toHaveBeenCalledWith(
        true,
        "Product retrieved successfully",
        mockProduct
      );
      expect(res.json).toHaveBeenCalled();
    });
  });

  describe("updateProduct", () => {
    it("should update product successfully", async () => {
      const updateData = { name: "Updated Product", price: 149.99 };
      const updatedProduct = {
        id: 1,
        ...updateData,
        is_active: true,
      };

      req.params.id = "1";
      req.body = updateData;
      productService.updateProduct.mockResolvedValue(updatedProduct);

      await productController.updateProduct(req, res);

      // ✅ Fix: Expect string "1" since params are strings
      expect(productService.updateProduct).toHaveBeenCalledWith(
        "1",
        updateData
      );
      expect(formatResponse).toHaveBeenCalledWith(
        true,
        "Product updated successfully",
        updatedProduct
      );
      expect(res.json).toHaveBeenCalled();
    });
  });

  describe("deleteProduct", () => {
    it("should delete product successfully", async () => {
      req.params.id = "1";
      productService.deleteProduct.mockResolvedValue(true);

      await productController.deleteProduct(req, res);

      // ✅ Fix: Expect string "1" since params are strings
      expect(productService.deleteProduct).toHaveBeenCalledWith("1");
      expect(formatResponse).toHaveBeenCalledWith(
        true,
        "Product deleted successfully"
      );
      expect(res.json).toHaveBeenCalled();
    });
  });
});
