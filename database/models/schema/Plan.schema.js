const mongoose = require('mongoose');
const PermissionSchema = require('./Permission.schema');

const PlanSchema = mongoose.Schema({
  plan_name: {
    type: String,
    required: true,
  },
  permissions: {
    type: [PermissionSchema],
    required: true,
  },
});

module.exports = mongoose.Schema(PlanSchema);
