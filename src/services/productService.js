const { Product } = require("../models");
const { Op } = require("sequelize");

class ProductService {
  async createProduct(productData) {
    try {
      const product = await Product.create({
        ...productData,
        is_active: true,
      });

      return product;
    } catch (error) {
      throw error;
    }
  }

  async getAllProducts(filters = {}) {
    const {
      page = 1,
      limit = 10,
      search,
      category,
      minPrice,
      maxPrice,
    } = filters;
    const offset = (page - 1) * limit;

    const whereClause = { is_active: true };

    if (search) {
      whereClause[Op.or] = [
        { name: { [Op.like]: `%${search}%` } },
        { description: { [Op.like]: `%${search}%` } },
      ];
    }

    if (category) {
      whereClause.category = category;
    }

    if (minPrice || maxPrice) {
      whereClause.price = {};
      if (minPrice) whereClause.price[Op.gte] = minPrice;
      if (maxPrice) whereClause.price[Op.lte] = maxPrice;
    }

    const { count, rows } = await Product.findAndCountAll({
      where: whereClause,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [["created_at", "DESC"]],
    });

    return {
      products: rows,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: count,
        pages: Math.ceil(count / limit),
      },
    };
  }

  async getProductById(id) {
    const product = await Product.findByPk(id);
    if (!product || !product.is_active) {
      throw new Error("Product not found");
    }
    return product;
  }

  async updateProduct(id, updateData) {
    const product = await this.getProductById(id);
    return await product.update(updateData);
  }

  async deleteProduct(id) {
    const product = await this.getProductById(id);
    return await product.update({ is_active: false });
  }

  async getProductsByIds(ids) {
    return await Product.findAll({
      where: {
        id: { [Op.in]: ids },
        is_active: true,
      },
    });
  }
}

module.exports = new ProductService();
