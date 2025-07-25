const { Sequelize } = require("sequelize");
const config = require("./config");

const sequelize = new Sequelize(
  config.database.name,
  config.database.username,
  config.database.password,
  {
    host: config.database.host,
    port: config.database.port,
    dialect: "mysql",
    logging: false,
  }
);

module.exports = sequelize;
