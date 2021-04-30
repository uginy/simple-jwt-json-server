const { Schema, model } = require("mongoose");

const User = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  roles: [{ type: String, ref: "Role" }],
  language: { type: String, required: false, default: "en" },
});

module.exports = model("User", User);
