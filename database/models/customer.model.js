const crypto = require("crypto");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const customerSchema = mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone_code: { type: String, required: true },
  phone_number: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  gender: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
  postal_code: { type: String },
  user_status: { type: Boolean, default: true },
  avatar: { type: String },
  notes: { type: String },
  role: { type: String },
  created_at: { type: Date, default: Date.now },
  modified_at: { type: Date, default: Date.now },
  created_by: { type: String },
  modified_by: { type: String },
});

customerSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
});

// Sign JWT and return
customerSchema.methods.getSignedJwtToken = async function () {
  return jwt.sign({ id: this._id }, process.env.JWT_TOKEN_SECRET, {
    expiresIn: process.env.JWT_TOKEN_EXPIRY * 24 * 60 * 60 * 1000,
  });
};
// Match user password with entered password
customerSchema.methods.matchEnteredPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("wetransport_customer", customerSchema);
