const productService = require("../../../services/productService");
const { Product } = require("../../../models");

jest.mock("../../../models", () => ({
  Product: {
    create: jest.fn(),
    findAndCountAll: jest.fn(),
    findByPk: jest.fn(),
  },
}));

describe("ProductService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("createProduct", () => {
    it("should create a product successfully", async () => {
      const productData = {
        name: "Test Product",
        price: 99.99,
        description: "Test description",
        category: "test",
        stock_quantity: 10,
      };

      const expectedProduct = {
        id: 1,
        ...productData,
        is_active: true,
        created_at: new Date(),
        updated_at: new Date(),
      };

      Product.create.mockResolvedValue(expectedProduct);

      const result = await productService.createProduct(productData);

      // ✅ Fix: Expect the productData WITH is_active: true since your service adds it
      expect(Product.create).toHaveBeenCalledWith({
        ...productData,
        is_active: true,
      });
      expect(result).toEqual(expectedProduct);
    });
  });

  describe("getProductById", () => {
    it("should return product when found", async () => {
      const mockProduct = {
        id: 1,
        name: "Test Product",
        price: 99.99,
        is_active: true,
      };

      Product.findByPk.mockResolvedValue(mockProduct);

      const result = await productService.getProductById(1);

      expect(Product.findByPk).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockProduct);
    });

    it("should throw error when product not found", async () => {
      Product.findByPk.mockResolvedValue(null);

      await expect(productService.getProductById(999)).rejects.toThrow(
        "Product not found"
      );
    });

    it("should throw error when product is inactive", async () => {
      const mockProduct = {
        id: 1,
        name: "Test Product",
        is_active: false,
      };

      Product.findByPk.mockResolvedValue(mockProduct);

      await expect(productService.getProductById(1)).rejects.toThrow(
        "Product not found"
      );
    });
  });

  describe("updateProduct", () => {
    it("should update product successfully", async () => {
      const mockProduct = {
        id: 1,
        name: "Old Name",
        price: 99.99,
        is_active: true,
        update: jest.fn(),
      };

      const updateData = { name: "New Name", price: 149.99 };

      Product.findByPk.mockResolvedValue(mockProduct);
      mockProduct.update.mockResolvedValue({ ...mockProduct, ...updateData });

      const result = await productService.updateProduct(1, updateData);

      expect(Product.findByPk).toHaveBeenCalledWith(1);
      expect(mockProduct.update).toHaveBeenCalledWith(updateData);
    });

    it("should throw error when product not found for update", async () => {
      Product.findByPk.mockResolvedValue(null);

      await expect(
        productService.updateProduct(999, { name: "New Name" })
      ).rejects.toThrow("Product not found");
    });
  });

  describe("deleteProduct", () => {
    it("should soft delete product successfully", async () => {
      const mockProduct = {
        id: 1,
        name: "Test Product",
        is_active: true,
        update: jest.fn(),
      };

      Product.findByPk.mockResolvedValue(mockProduct);
      mockProduct.update.mockResolvedValue(true);

      const result = await productService.deleteProduct(1);

      expect(Product.findByPk).toHaveBeenCalledWith(1);
      expect(mockProduct.update).toHaveBeenCalledWith({ is_active: false });
      expect(result).toBe(true);
    });

    it("should throw error when product not found for deletion", async () => {
      Product.findByPk.mockResolvedValue(null);

      await expect(productService.deleteProduct(999)).rejects.toThrow(
        "Product not found"
      );
    });
  });
});
