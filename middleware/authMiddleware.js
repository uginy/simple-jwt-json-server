const fs = require("fs");
const jwt = require("jsonwebtoken");

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


module.exports = {
  expiresIn,
  createToken,
  verifyToken,
  isAuthenticated,
  userProfile,
};
