import logData from '../dataLogger';
import { sawmillSitter } from '../observer/sawmill';
import { HandlerType } from '../types/handler';
import { SawmillConfig, HandlerFunction, SawmillFunction } from '../types/sawmill';
import { Request, Response, NextFunction } from 'express';

//@ts-ignore
sawmill.stats = {}



class Handler implements HandlerType {
  durations: number[]

  constructor() {
    this.durations = [];
  }

  addDuration(duration: number) {
    this.durations.push(duration);
  }

  average(): number {
    const sum = this.durations.reduce((a, b) => a + b, 0);
    return this.durations.length ? Number((sum / this.durations.length).toFixed(2)) : 0;
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

  length() {
    return this.durations.length
  }
  
  clear() {
    this.durations = [];
  }
}

const sawmill: SawmillFunction = function sawmill(handler?: HandlerFunction, config?: SawmillConfig): any {
  if(!handler) {
    return sawmillSitter();
  }
//@ts-ignore
  if (!sawmill.stats[handler.name]) {
    //@ts-ignore
    sawmill.stats[handler.name] = new Handler();
  }

    const { precision = 'milliseconds', method = 'consoleLog', path = '', version = 'v1' } = config || {};

    return async function (req: Request, res: Response) {
      const startTime = Date.now();
      await handler(req, res);
      const endTime = Date.now();
      let duration;

  
      switch(precision) {
        case 'seconds':
          duration = ((endTime - startTime) / 1000).toFixed(3);
          break;
        case 'milliseconds':
        default:
          duration = (endTime - startTime);
          break;
      }
//@ts-ignore
      sawmill.stats[handler.name].addDuration(parseFloat(duration))

      let logEntry;
      switch(method){
        case 'consoleLog':
            console.log(`Sawmill: ${handler.name}'s request was processed in ${duration} ${precision}`)
            break;
        case 'fileLog':
            console.log('Log Method Case')
            logEntry = {handler: handler.name, duration, precision, version, timestamp: new Date().toString()}
            //@ts-ignore
            logData(handler.name, logEntry, path);
            break;
        case 'bothLogs':
            console.log('Both Cases')
            logEntry = {handler: handler.name, duration, precision, version, timestamp: new Date().toString()}
            //@ts-ignore
            logData(handler.name, logEntry, path);
            console.log(`Sawmill: ${handler.name}'s request was processed in ${duration} ${precision}`)
            //@ts-ignore
            console.log(`Sawmill length: ${sawmill.stats[handler.name].length()}`)
            //@ts-ignore
            console.log(`Sawmill avg: ${sawmill.stats[handler.name].average()}`)
            break;
      }
      //@ts-ignore
      next() // -> ensure that next works in the context of middlewar eand the handler's response is being passed on
    };
  } as SawmillFunction

  module.exports = sawmill
  