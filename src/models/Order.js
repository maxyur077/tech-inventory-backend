const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Order = sequelize.define(
  "Order",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    order_id: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    product_ids: {
      type: DataTypes.JSON,
      allowNull: false,
      validate: {
        isArray(value) {
          if (!Array.isArray(value)) {
            throw new Error("Product IDs must be an array");
          }
        },
      },
    },
    total_amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        isDecimal: { msg: "Total amount must be a valid decimal number" },
        min: { args: [0.01], msg: "Total amount must be greater than 0" },
      },
    },
    status: {
      type: DataTypes.ENUM(
        "pending",
        "confirmed",
        "shipped",
        "delivered",
        "cancelled"
      ),
      defaultValue: "pending",
    },
    order_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "orders",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    hooks: {
      beforeCreate: (order) => {
        if (!order.order_id) {
          order.order_id = `ORD-${Date.now()}-${Math.random()
            .toString(36)
            .substr(2, 9)
            .toUpperCase()}`;
        }
      },
    },
  }
);

module.exports = Order;
