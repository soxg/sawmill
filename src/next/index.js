const logData = require("../dataLogger");

class Handler {
  constructor() {
    this.durations = [];
  }

  addDuration(duration) {
    this.durations.push(duration);
  }

  average() {
    const sum = this.durations.reduce((a, b) => a + b, 0);
    return this.durations.length ? (sum / this.durations.length).toFixed(0) : 0;
  }

  median() {
    if (!this.durations.length) return 0;
    const sorted = [...this.durations].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
  }

  min() {
    return Math.min(...this.durations);
  }

  max() {
    return Math.max(...this.durations);
  }

  sum() {
    return this.durations.reduce((a, b) => a + b, 0);
  }

  count() {
    return this.durations.length;
  }

  stdDev() {
    const avg = this.average();
    const squareDiffs = this.durations.map(value => (value - avg) ** 2);
    const avgSquareDiff = squareDiffs.reduce((a, b) => a + b, 0) / squareDiffs.length;
    return Math.sqrt(avgSquareDiff)
  }

  variance() {
    const stdDevValue = this.stdDev();
    return (stdDevValue * stdDevValue)
  }
  
  clear() {
    this.durations = [];
  }
}


function sawmillNext(handler, config = {}) {
  if (!sawmill[handler.name]) {
    sawmill[handler.name] = new Handler();
  }

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

      sawmill[handler.name].addDuration(parseFloat(duration))

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
  
  module.exports = {
    sawmillNext,
    sawmill
  }
  