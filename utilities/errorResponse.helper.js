const debug = require('debug')('WeTransport:utilities:ErrorResponse');
const winston = require('winston');

// Shows a debug message for a throw error
// Emits a statusCode, message, and rawError that can be rendered by other functions

class ErrorResponse extends Error {
  constructor(message, statusCode, rawError) {
    winston.error({
      message: message || 'NO MESSAGE SUPPLIED',
      error: rawError || 'NO ERROR SUPPLIED',
    });
    super();
    this.statusCode = statusCode;
    this.message = message;
    this.rawError = rawError;
  }
}
module.exports = ErrorResponse;
