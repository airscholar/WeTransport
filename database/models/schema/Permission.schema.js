const mongoose = require('mongoose');

const PermissionsSchema = new mongoose.Schema({
  module: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  view: {
    type: Boolean,
    default: false,
  },
  create: {
    type: Boolean,
    default: false,
  },
  edit: {
    type: Boolean,
    default: false,
  },
  delete: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.Schema(PermissionsSchema);
