const { Schema, model } = require("mongoose");

const ExtraValuesSchema = new Schema(
  {
    base_unit: { type: String },
    base_value: { type: Number },
    base_type: { type: String },
    low_value: { type: Number },
    low_unit: { type: String },
    high_value: { type: Number },
    high_unit: { type: String },
  },
  { _id: false }
);

const Rules = new Schema(
  {
    account_id: { type: Number },
    rule_type: { type: Number },
    alorithm_type: { type: Number },
    notification_type: { type: String },
    person_id: { type: Number },
    sensor_id: { type: [String] },
    time: { type: { start: { type: String }, end: { type: String } } },
    frequency: { type: String },
    enabled: { type: Boolean },
    extra_values: { type: ExtraValuesSchema },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Rules", Rules);
