const sequelize = require("../config/database");
const Product = require("./Product");
const User = require("./User");
const Order = require("./Order");

User.hasMany(Order, {
  foreignKey: "user_id",
  as: "orders",
});

Order.belongsTo(User, {
  foreignKey: "user_id",
  as: "user",
});

const models = {
  Product,
  User,
  Order,
  sequelize,
};

module.exports = models;
