const asyncHandler = require("express-async-handler");
const userService = require("../services/userService");
const { formatResponse } = require("../utils/responseFormatter");

const userController = {
  register: asyncHandler(async (req, res) => {
    const user = await userService.createUser(req.body);
    res
      .status(201)
      .json(formatResponse(true, "User registered successfully", user));
  }),

  login: asyncHandler(async (req, res) => {
    const result = await userService.authenticateUser(req.body);
    res.json(formatResponse(true, "Login successful", result));
  }),

  getProfile: asyncHandler(async (req, res) => {
    const user = await userService.getUserById(req.user.id);
    res.json(formatResponse(true, "Profile retrieved successfully", user));
  }),

  updateProfile: asyncHandler(async (req, res) => {
    const user = await userService.updateUser(req.user.id, req.body);
    res.json(formatResponse(true, "Profile updated successfully", user));
  }),
};

module.exports = userController;
