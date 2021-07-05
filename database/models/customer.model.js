const mongoose = require("mongoose");

const customerSchema = mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true },
  telephone: { type: String, required: true },
  phone_number: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  gender: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
  postal_code: { type: String, required: true },
  user_status: { type: Boolean, required: true },
  avatar: { type: String },
  notes: { type: String },
  created_at: { type: Date, default: Date.now },
  modified_at: { type: Date, default: Date.now },
  created_by: { type: String, required: true },
  modified_by: { type: String, required: true },
});

module.exports = mongoose.model("wetransport_customer", customerSchema);
