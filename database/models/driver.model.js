const mongoose = require("mongoose");

const driverSchema = mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone_code: { type: String, required: true },
  phone_number: { type: String, required: true },
  vehicle_reg_no: { type: String, required: true, unique: true },
  vehicle_code: { type: String, required: true, unique: true },
  gender: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
  postal_code: { type: String },
  user_status: { type: Boolean, default: true },
  avatar: { type: String },
  notes: { type: String },
  created_at: { type: Date, default: Date.now },
  modified_at: { type: Date, default: Date.now },
  created_by: { type: String },
  modified_by: { type: String },
});

module.exports = mongoose.model("wetransport_driver", driverSchema);
