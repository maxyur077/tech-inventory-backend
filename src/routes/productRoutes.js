const express = require("express");
const productController = require("../controllers/productController");
const { authenticate, authorize } = require("../middlewares/auth");
const { validate, schemas } = require("../middlewares/validation");

const router = express.Router();

router
  .route("/")
  .post(validate(schemas.product), productController.createProduct)
  .get(productController.getAllProducts);

router
  .route("/:id")
  .get(productController.getProductById)
  .put(
    authenticate,
    validate(schemas.productUpdate),
    productController.updateProduct
  )
  .delete(authenticate, productController.deleteProduct);

module.exports = router;
