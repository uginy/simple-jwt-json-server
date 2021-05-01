const User = require("../models/User");
const Role = require("../models/Role");
const ApiError = require("../errors/apiErrors");
const AuthMiddleware = require("../middleware/authMiddleware")
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const fs = require("fs");


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

  // Old

  loginOld(req, res, next) {
    console.log("login endpoint called; request body:");
    console.log(req.body);
    const { username, password } = req.body;
    const isAuth = AuthMiddleware.isAuthenticated({ username, password });
    if (isAuth === false) {
      next(ApiError.existsRequest("Incorrect username or password"));
      return;
    }
    const user = AuthMiddleware.userProfile({ username });
    const access_token = AuthMiddleware.createToken({ username, password, role: user.role });
    console.log("Access Token:" + access_token);
   // const user = authMiddleware.userProfile({ username });
    res.status(200).json({
      access_token: access_token,
      expires: AuthMiddleware.expiresIn,
      token_created: new Date(),
      username: username,
      language: user.language,
      role: user.role
    });
  }

  registerOld(req, res, next) {
    console.log("register endpoint called; request body:");
    console.log(req.body);
    const { username, password } = req.body;
    const isAuth = AuthMiddleware.isAuthenticated({ username, password });
    if (isAuth === true) {
      next(ApiError.existsRequest("Username and Password already exist"));
      return;
    }

    fs.readFile("./fixtures/users.json", (err, dataBuff) => {
      if (err) {
        next(ApiError.internal("Error reading DB"));
        return;
      }
      // Get current users data
      const data = JSON.parse(dataBuff.toString());

      // Get the id of last user
      const last_item_id = data.users[data.users.length - 1].id;

      //Add new user
      data.users.push({ id: last_item_id + 1, username: username, password: password, language: "en", role: "admin" }); //add some data
      fs.writeFile("./fixtures/users.json", JSON.stringify(data), (err, _) => {
        // WRITE
        if (err) {
          next(ApiError.internal("Error reading DB"));
          return;
        }
        // Create token for new user
        const access_token = AuthMiddleware.createToken({ username, password, role: 'admin' });
        console.log("Access Token:" + access_token);
        res.status(200).json({ access_token, expires: AuthMiddleware.expiresIn, token_created: new Date(), username });
      });
    });
  }
}

module.exports = new AuthController();
