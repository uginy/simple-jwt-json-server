const fs = require("fs");
const jwt = require("jsonwebtoken");

const secret = "123456789";
const expiresIn = "1h";

const userDB = JSON.parse(fs.readFileSync("./fixtures/users.json", "utf-8").toString());
const reportsDB = JSON.parse(fs.readFileSync("./fixtures/reports.json", "utf-8").toString());
const databaseDB = JSON.parse(fs.readFileSync("./fixtures/database.json", "utf-8").toString());

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
  return userDB.users.findIndex((user) => user.username === username && user.password === password) !== -1;
};

// get user data
const userProfile = ({ username }) => {
  return userDB.users.find((user) => user.username === username) || null;
};


module.exports = {
  expiresIn,
  userDB,
  databaseDB,
  reportsDB,
  createToken,
  verifyToken,
  isAuthenticated,
  userProfile,
};
