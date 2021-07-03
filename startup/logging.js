const config = require('../config');
const winston = require('winston'); // logger
require('express-async-errors');
require('winston-mongodb');
require('winston-daily-rotate-file');
const path = require('path');

// - Write all logs with level `error` and below to `error.log`
const errors = new winston.transports.DailyRotateFile({
  filename: path.join(`${config.logDir()}`, 'app', 'error-%DATE%.log'),
  level: 'error',
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d',
});

// - Write all logs with level `info` and below to `combined.log`
const combined = new winston.transports.DailyRotateFile({
  filename: path.join(`${config.logDir()}`, 'app', 'combined-%DATE%.log'),
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d',
});

module.exports = () => {
  // handling uncaught exceptions so not things going wrong in express
  // e.g. during startup
  process.on('uncaughtException', ex => {
    winston.error(ex.message, ex);
    process.exit(1);
  });

  // handling rejections (promises) so ones missing the catch block
  process.on('unhandledRejection', ex => {
    winston.error(ex.message, ex);
    process.exit(1);
  });

  const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
      winston.format.timestamp({
        format: 'HH:mm:ss',
      }),
      winston.format.errors({ stack: true }),
      winston.format.splat(),
      winston.format.json()
    ),
    defaultMeta: { service: 'PageSpeedy' },
    transports: [errors, combined],
  });

  function errorReplacer(value) {
    console.log(value);
    if (value instanceof Error) {
      return value.stack;
    }
    return value;
  }

  logger.add(
    new winston.transports.MongoDB(
      {
        // db: 'mongodb://localhost/pagespeedy',
        db: `${config.mongoURI()}`,
        level: 'error', // only log messages that are of level error
      },
      { useUnifiedTopology: true }
    )
  );

  if (process.env.NODE_ENV !== 'production') {
    logger.add(
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.errors({ stack: true }),
          winston.format.colorize(),
          winston.format.splat(),
          winston.format.printf(item => {
            // console.log(item)
            if (item.error) return `${item.timestamp} ${item.level}: ${item.message} \n ${errorReplacer(item.error)}`;
            return `${item.timestamp} ${item.level}: ${item.message}`;
          })
        ),
      })
    );
  }

  winston.add(logger);
};
