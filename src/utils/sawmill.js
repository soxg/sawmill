const logData = require("../dataLogger");
const accessData = require('../dataLogAccess')
const { sawmillSitter } = require("../observer/sawmill");

sawmill.stats = {}

class Handler {
  constructor() {
    this.durations = [];
  }

  average() {
    return accessData(this.functionName, 'average', this.precision, this.path);
  }

  addSessionDuration(duration) {
    this.durations.push(duration);
  }

  sessionAverage() {
    const sum = this.durations.reduce((a, b) => a + b, 0);
    return this.durations.length ? Number((sum / this.durations.length).toFixed(2)) : 0;
  }

  sessionMedian() {
    if (!this.durations.length) return 0;
    const sorted = [...this.durations].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
  }

  sessionMin() {
    return Math.min(...this.durations);
  }

  sessionMax() {
    return Math.max(...this.durations);
  }

  sessionSum() {
    return this.durations.reduce((a, b) => a + b, 0);
  }

  sessionCount() {
    return this.durations.length;
  }

  sessionStdDev() {
    const avg = this.average();
    const squareDiffs = this.durations.map(value => (value - avg) ** 2);
    const avgSquareDiff = squareDiffs.reduce((a, b) => a + b, 0) / squareDiffs.length;
    return Math.sqrt(avgSquareDiff)
  }

  sessionVariance() {
    const stdDevValue = this.stdDev();
    return (stdDevValue * stdDevValue)
  }

  sessionLength() {
    return this.durations.length
  }
  
  sessionClear() {
    this.durations = [];
  }
}

function sawmill(handler, config = {}) {
  if(!handler) {
    return sawmillSitter();
  }

  if (!sawmill.stats[handler.name]) {
    sawmill.stats[handler.name] = new Handler();
  }
  
    const { precision = 'milliseconds', mode = 'consoleLog', path = '', version = 'v1', method = 'false', responseStatus = 'false' } = config;
    
    sawmill.stats[handler.name].path = path
    sawmill.stats[handler.name].functionName = handler.name
    sawmill.stats[handler.name].precision = precision

    return async function (req, res) {
      const startTime = Date.now();
      await handler(req, res);
      const endTime = Date.now();
      let duration;

      switch(method) {
        case 'true':
          break;
        case 'false':
          break;
        case null:
          break;
      }

      switch(responseStatus) {
        case 'true':
          break;
        case 'false':
          break;
        case null:
          break;
      }

  
      switch(precision) {
        case 'seconds':
          duration = ((endTime - startTime) / 1000).toFixed(3);
          break;
        case 'milliseconds':
        default:
          duration = (endTime - startTime);
          break;
      }

      sawmill.stats[handler.name].addSessionDuration(parseFloat(duration))

      let logEntry;
      switch(mode){
        case 'consoleLog':
            console.log(`Sawmill: ${handler.name}'s request was processed in ${duration} ${precision}`)
            break;
        case 'fileLog':
            console.log('File Log Mode')
            logEntry = {handler: handler.name, duration, precision, version, timestamp: new Date().toString()}
            logData(handler.name, logEntry, precision, path);
            break;
        case 'bothLogs':
            console.log('Both Console and Log Mode')
            logEntry = {handler: handler.name, duration, precision, version, timestamp: new Date().toString()}
            logData(handler.name, logEntry, precision, path);
            console.log(`Sawmill: ${handler.name}'s request was processed in ${duration} ${precision}`)
            console.log(`Sawmill length: ${sawmill.stats[handler.name].sessionLength()}`)
            console.log(`Sawmill avg: ${sawmill.stats[handler.name].sessionAverage()}`)
            console.log(`Sawmill log avg: ${sawmill.stats[handler.name].average()} `)
            break;
      }
      if (typeof next !== 'undefined') {
        next()
      }
    };
  }

  module.exports = sawmill
  