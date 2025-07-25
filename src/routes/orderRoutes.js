const express = require("express");
const orderController = require("../controllers/orderController");
const { authenticate } = require("../middlewares/auth");
const { validate, schemas } = require("../middlewares/validation");

const router = express.Router();

router.use(authenticate);

router
  .route("/")
  .post(validate(schemas.order), orderController.createOrder)
  .get(orderController.getAllOrders);

router
  .route("/:id")
  .get(orderController.getOrderById)
  .put(validate(schemas.orderUpdate), orderController.updateOrder)
  .delete(orderController.deleteOrder);

module.exports = router;
