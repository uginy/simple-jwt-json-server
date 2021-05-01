const { Schema, model } = require("mongoose");

const TimesSchema = new Schema(
  {
    start: { type: Date },
    end: { type: Date },
  },
  { _id: false }
);

const Report = new Schema({
  date: { type: String },
  room: { type: String },
  person: { type: Number },
  label: { type: String },
  times: { type: [TimesSchema] },
});

module.exports = model("Report", Report);
