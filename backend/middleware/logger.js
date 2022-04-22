const { createLogger, format, transports } = require('winston');

let appRoot = require('../app');

const logger = createLogger({
    level: 'info',
    exitOnError: false,
    format: format.json(),
    transports: [
        new transports.File({ filename: `logs/test.log` }),
    ],
});

module.exports = logger;