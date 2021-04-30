const User = require("../models/User");
const Role = require("../models/Role");
const ApiError = require("../errors/apiErrors");
const AuthMiddleware = require("../middleware/authMiddleware")
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
class AuthController {
  async registration(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Registration validation errors", errors });
      }
      const { username, password } = req.body;
      const candidate = await User.findOne({ username });
      if (candidate) {
        return next(ApiError.existsRequest("Specified user has already exists"));
      }
      const hashPassword = bcrypt.hashSync(password, 7);
      const userRole = await Role.findOne({ value: "user" });
      const user = new User({
        username: username,
        password: hashPassword,
        roles: [userRole.value],
        language: "en",
      });
      await user.save();
      return res.json({ message: "User successfuly registered" });
    } catch (error) {
      console.log(error);
      next(ApiError.notFound("Registration error"));
    }
  }

  async login(req, res, next) {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user) {
        return next(ApiError.notFound(`User ${username} has not found`));
      }

      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        return next(ApiError.notFound(`User ${username} with specified password not found`));
      }

      const token = AuthMiddleware.generateAccessToken(user._id, user.roles);
      return res.json({ token })

    } catch (error) {
      console.log(e);
      next(ApiError.notFound("Login error"));
    }
  }

  async getUsers(req, res, next) {
    try {
      const users = await User.find();
      res.json(users)
    } catch (error) {
      console.log(e);
      next(ApiError.notFound("Get users error"));
    }
  }
}

module.exports = new AuthController();
