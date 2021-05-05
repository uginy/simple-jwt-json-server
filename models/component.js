const { Schema, model } = require("mongoose");

const Component = new Schema({
  component: [String],
});

module.exports = model("Component", Component);
