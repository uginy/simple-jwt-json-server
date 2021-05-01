const { Schema, model } = require("mongoose");

const ExtraValuesSchema = new Schema(
  {
    base_value: { type: Number },
    actual_value: { type: Number },
    base_unit: { type: String },
  },
  { _id: false }
);

const Notification = new Schema(
  {
    type: { type: String },
    rule_type: { type: String },
    notification_type: { type: String },
    date_time: { type: Date },
    account_id: { type: Number },
    account_name: { type: String },
    resident_id: { type: Number },
    service_provider_id: { type: String },
    sensor_id: { type: [String] },
    resident_name: { type: String },
    notes: { type: String },
    description: { type: String },
    status: { type: String },
    status_popup: { type: String },
    frequency: { type: String },
    status: { type: String },
    reason: { type: String },
    extra_values: { type: ExtraValuesSchema },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Notification", Notification);
