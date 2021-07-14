const { createLogger, format, transports, config } = require('winston');

// Import mongodb
require('winston-mongodb');

const logger = createLogger({
    transports: [
        new transports.File({ filename: './logs/app-logger.log' , level: 'error'}),
        new transports.Console()
    ],
    levels: config.syslog.levels,
    format:format.combine(
        format.timestamp({format: 'MMM-DD-YYYY HH:mm:ss'}),
        format.align(),
        format.printf(info => `${info.level}: ${[info.timestamp]}: ${info.message}`),
    )});

module.exports = {
    logger: logger,
};
