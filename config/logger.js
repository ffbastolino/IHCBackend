const winston = require('winston');

const loggerLevel = process.env.NODE_ENV === 'test' ? 'error' : (process.env.W2M_LOGGER_LEVEL || 'info');

const logger = winston.createLogger({
  level: loggerLevel,
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.simple(),
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

logger.stream = {
  write(message) {
    logger.info(message);
  },
};

module.exports = logger;
