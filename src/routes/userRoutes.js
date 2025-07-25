const express = require("express");
const userController = require("../controllers/userController");
const { authenticate } = require("../middlewares/auth");
const { validate, schemas } = require("../middlewares/validation");

const router = express.Router();

router.post(
  "/register",
  validate(schemas.userRegister),
  userController.register
);
router.post("/login", validate(schemas.userLogin), userController.login);

router
  .route("/profile")
  .get(authenticate, userController.getProfile)
  .put(
    authenticate,
    validate(schemas.userUpdate),
    userController.updateProfile
  );

module.exports = router;
