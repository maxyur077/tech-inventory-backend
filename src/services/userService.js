const { User } = require("../models");
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");
const config = require("../config/config");

class UserService {
  async createUser(userData) {
    const existingUser = await User.findOne({
      where: {
        [Op.or]: [{ username: userData.username }, { email: userData.email }],
      },
    });

    if (existingUser) {
      throw new Error("Username or email already exists");
    }

    const user = await User.create(userData);
    const userResponse = user.toJSON();
    delete userResponse.password;
    return userResponse;
  }

  async authenticateUser(loginData) {
    const { username, password } = loginData;

    const user = await User.findOne({
      where: {
        [Op.or]: [{ username }, { email: username }],
        is_active: true,
      },
    });

    if (!user || !(await user.checkPassword(password))) {
      throw new Error("Invalid credentials");
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      config.jwt.secret,
      { expiresIn: config.jwt.expiresIn }
    );

    const userResponse = user.toJSON();
    delete userResponse.password;

    return { user: userResponse, token };
  }

  async getUserById(id) {
    const user = await User.findByPk(id, {
      attributes: { exclude: ["password"] },
    });

    if (!user || !user.is_active) {
      throw new Error("User not found");
    }

    return user;
  }

  async updateUser(id, updateData) {
    const user = await User.findByPk(id);
    if (!user || !user.is_active) {
      throw new Error("User not found");
    }

    if (updateData.password === "") {
      delete updateData.password;
    }

    await user.update(updateData);
    const updatedUser = user.toJSON();
    delete updatedUser.password;
    return updatedUser;
  }
}

module.exports = new UserService();
