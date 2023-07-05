const expressLogger = require('./src/express');
const nextLogger = require('./src/next');

module.exports = {
  express: expressLogger,
  next: nextLogger
};
