const mongoose = require("mongoose");
const locationSchema = mongoose.Schema({
  latitude: String,
  longitude: String,
});

module.exports = mongoose.model("wetransport_location", locationSchema);
