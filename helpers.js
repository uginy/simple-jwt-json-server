const fs = require("fs");
const jwt = require("jsonwebtoken");

const secret = "123456789";

module.exports = {
  // constants
  expiresIn: "1h",
  userDB: JSON.parse(fs.readFileSync("./users.json", "utf-8").toString()),
  databaseDB: JSON.parse(fs.readFileSync("./database.json", "utf-8").toString()),
  // search database db with conditions from req.body
  search(data) {
    return Object.keys(this).every((key) => {
      if (key !== "times") {
        return data[key] === this[key];
      } else {
        return (
            !!data[key].find((el) => new Date(el.start).getTime() >= new Date(this[key].start).getTime())
            &&
            !!data[key].find((el) => new Date(el.end).getTime() <= new Date(this[key].end).getTime())
        );
      }
    });
  },
  // create token and jwt sign
  createToken(payload) {
    return jwt.sign(payload, secret, { expiresIn: this.expiresIn });
  },
  // verify token
  verifyToken(token) {
    return jwt.verify(token, secret, (err, decode) => (decode !== undefined ? decode : err));
  },
  // check if user is auth
  isAuthenticated({ username, password }) {
    return this.userDB.users.findIndex((user) => user.username === username && user.password === password) !== -1;
  },
  // get user data
  userProfile({ username }) {
    return this.userDB.users.find((user) => user.username === username) || null;
  },
};
