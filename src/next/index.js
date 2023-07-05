const logData = require("../dataLogger");

function sawmillNext(handler, config = {}) {
    const { precision = 'milliseconds', method = 'console' } = config;

    return async function (req, res) {
      const startTime = Date.now();
      await handler(req, res);
      const endTime = Date.now();
      let duration;
  
      switch(precision) {
        case 'seconds':
          duration = ((endTime - startTime) / 1000).toFixed(2);
          break;
        case 'milliseconds':
        default:
          duration = (endTime - startTime).toFixed(0);
          break;
      }

      let logEntry;
      switch(method){
        case 'console':
            console.log(`Sawmill: ${handler.name}'s request was processed in ${duration} ${precision}`)
            break;
        case 'log':
            console.log('Log Method Case')
            logEntry = {handler: handler.name, duration, precision, timestamp: new Date().toString()}
            logData(handler.name, logEntry);
            break;
        case 'both':
            console.log('Both Cases')
            logEntry = {handler: handler.name, duration, precision, timestamp: new Date().toString()}
            logData(handler.name, logEntry);
            console.log(`Sawmill: ${handler.name}'s request was processed in ${duration} ${precision}`)
            break;
      }
  
      console.log(`Sawmill: ${handler.name}'s request processed in ${duration} ${precision}`);
    };
  }
  
  module.exports = sawmillNext;
  