const crypto = require("crypto");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Tracking	Date	Sender	Receiver	Origin	Destination	Payment	Status	Driver	Cost Total	Invoice Status
const shipmentSchema = mongoose.Schema({
  shipment_prefix: { type: String, required: true },
  order_number_tracking: { type: String, required: true },
  agency_name: { type: String, required: true },
  origin_office: { type: String, required: true },
  sender_id: { type: String, required: true },
  sender_name: { type: String, required: true },
  sender_address: { type: String, required: true },
  receiver_name: { type: String, required: true },
  receiver_address: { type: String, required: true },
  package_type: { type: String, required: true },
  courier_company: { type: String, required: true },
  shipping_mode: { type: String, required: true },
  order_date: { type: Date, required: true },
  estimated_delivery_date: { type: Date },
  delivery_time: { type: String },
  assigned_driver: { type: String },
  payment_method: { type: String },
  delivery_status: { type: String },
  created_at: { type: Date, default: Date.now },
  modified_at: { type: Date, default: Date.now },
  created_by: { type: String },
  modified_by: { type: String },
});

module.exports = mongoose.model("wetransport_shipment", shipmentSchema);
