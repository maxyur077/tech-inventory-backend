const { Order, User } = require("../models");
const productService = require("./productService");

class OrderService {
  async createOrder(orderData) {
    const { user_id, product_ids, total_amount } = orderData;

    // Validate user exists
    await User.findByPk(user_id);
    if (!user) {
      throw new Error("User not found");
    }

    // Validate products exist
    const products = await productService.getProductsByIds(product_ids);
    if (products.length !== product_ids.length) {
      throw new Error("One or more products not found");
    }

    // Calculate total amount based on products
    const calculatedTotal = products.reduce((sum, product) => {
      return sum + parseFloat(product.price);
    }, 0);

    if (Math.abs(calculatedTotal - parseFloat(total_amount)) > 0.01) {
      throw new Error("Total amount mismatch");
    }

    return await Order.create(orderData);
  }

  async getAllOrders(filters = {}) {
    const { page = 1, limit = 10, user_id, status } = filters;
    const offset = (page - 1) * limit;

    const whereClause = {};

    if (user_id) {
      whereClause.user_id = user_id;
    }

    if (status) {
      whereClause.status = status;
    }

    const { count, rows } = await Order.findAndCountAll({
      where: whereClause,
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "username", "email"],
        },
      ],
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [["created_at", "DESC"]],
    });

    return {
      orders: rows,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: count,
        pages: Math.ceil(count / limit),
      },
    };
  }

  async getOrderById(id) {
    const order = await Order.findByPk(id, {
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "username", "email"],
        },
      ],
    });

    if (!order) {
      throw new Error("Order not found");
    }

    return order;
  }

  async updateOrder(id, updateData) {
    const order = await this.getOrderById(id);
    return await order.update(updateData);
  }

  async deleteOrder(id) {
    const order = await this.getOrderById(id);
    return await order.destroy();
  }
}

module.exports = new OrderService();
