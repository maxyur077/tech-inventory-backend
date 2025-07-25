const app = require("./src/app");
const config = require("./src/config/config");
const { sequelize } = require("./src/models");

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection established successfully");

    await sequelize.sync({ force: false });
    console.log("Database models synchronized");

    const server = app.listen(config.port, () => {
      console.log(
        `Server running in ${config.nodeEnv} mode on port ${config.port}`
      );
    });

    process.on("SIGTERM", async () => {
      console.log("SIGTERM received, shutting down gracefully");
      server.close(async () => {
        await sequelize.close();
        console.log("Process terminated");
        process.exit(0);
      });
    });
  } catch (error) {
    console.error(" Unable to start server:", error);
    process.exit(1);
  }
};

startServer();
