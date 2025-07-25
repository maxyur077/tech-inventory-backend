const express = require("express");
const productRoutes = require("./productRoutes");
const userRoutes = require("./userRoutes");
const orderRoutes = require("./orderRoutes");

const router = express.Router();

router.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "API is running",
    timestamp: new Date().toISOString(),
  });
});

router.use("/products", productRoutes);
router.use("/users", userRoutes);
router.use("/orders", orderRoutes);

module.exports = router;
