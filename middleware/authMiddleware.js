const fs = require("fs");
const jwt = require("jsonwebtoken");
const config = require("config");
const ApiError = require("../errors/apiErrors");

const secret = "123456789";
const expiresIn = "1h";

// create token and jwt sign
const createToken = (payload) => {
  return jwt.sign(payload, secret, { expiresIn: expiresIn });
};

// verify token
const verifyToken = (token) => {
  return jwt.verify(token, secret, (err, decode) => (decode !== undefined ? decode : err));
};

// check if user is auth
const isAuthenticated = ({ username, password }) => {
  const userDb = JSON.parse(fs.readFileSync("./fixtures/users.json", "utf-8").toString());
  return userDb.users.find((user) => user.username === username && user.password === password) !== undefined;
};

// get user data
const userProfile = ({ username }) => {
  const userDb = JSON.parse(fs.readFileSync("./fixtures/users.json", "utf-8").toString());
  return userDb.users.find((user) => user.username === username) || null;
};

// new MiddleWare

const generateAccessToken = (id, roles) => {
  const payload = {
    id,
    roles,
  };
  return jwt.sign(payload, config.get("secret"), { expiresIn: config.get("expiresIn")});
};

const getUserRole = (req, res, next) => {
  if (req.method === "OPTIONS") {
    next();
  }

  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return next(ApiError.forbidden("User is not authorized"));
    }
    const decodedData = jwt.verify(token, config.get("secret"));
    req.user = decodedData;
    next();
  } catch (error) {
    console.log(error);
    return next(ApiError.forbidden("User is not authorized"));
  }
};

const roleCheck = (roles) => {
  return function (req, res, next) {
    if (req.method === "OPTIONS") {
      next();
    }

    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        return next(ApiError.forbidden("User is not authorized"));
      }
      const { roles: userRoles } = jwt.verify(token, config.get("secret"));
      let hasRole = false;
      userRoles.forEach((role) => {
        if (roles.includes(role)) {
          hasRole = true;
        }
      });
      if (!hasRole) {
        return next(ApiError.forbidden("User is not authorized"));
      }
      next();
    } catch (error) {
      console.log(error);
      return next(ApiError.forbidden("User is not authorized"));
    }
  };
};

module.exports = {
  expiresIn,
  createToken,
  verifyToken,
  isAuthenticated,
  userProfile,
  generateAccessToken,
  getUserRole,
  roleCheck
};
