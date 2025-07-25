const productService = require("../../../src/services/productService");
const { Product } = require("../../../src/models");

jest.mock("../../../src/models", () => ({
  Product: {
    create: jest.fn(),
    findAndCountAll: jest.fn(),
    findByPk: jest.fn(),
    findAll: jest.fn(),
  },
}));

describe("ProductService", () => {
  afterEach(() => {
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
      Product.create.mockResolvedValue(mockProduct);

      const result = await productService.createProduct(productData);

      expect(Product.create).toHaveBeenCalledWith(productData);
      expect(result).toEqual(mockProduct);
    });
  });

  describe("getProductById", () => {
    it("should return a product when found", async () => {
      const mockProduct = {
        id: 1,
        name: "Test Product",
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
  });
});
