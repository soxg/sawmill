import fs from 'fs';
import path from 'path';

interface LogEntry {
  handler: string | undefined;
  duration: number;
  precision: string;
  version: string;
  timestamp: string;
}



function logData(functionName: string, logEntry: LogEntry, logPath: string = 'sawmill-logs'): void {
  const logFilePath = path.join(logPath, `${functionName}-log.json`);

  if (!fs.existsSync(logPath)) {
    try {
      fs.mkdirSync(logPath);
    } catch (e) {
      console.error('Sawmill: Issue creating path from config object. Error: ', e);
    }
  }

  let logArray: LogEntry[] = [];
  if (fs.existsSync(logFilePath)) {
    const existingData = fs.readFileSync(logFilePath, 'utf8');
    logArray = existingData ? JSON.parse(existingData) : [];
  }

  logArray.push(logEntry);
  //@ts-ignore
  fs.writeFileSync(logFilePath, JSON.stringify(logArray, null, 2), 'utf8', (error) => {
    if (error) {
      console.error(`Sawmill: Error writing to log file for ${functionName} at ${logFilePath}:`, error);
    }
  });
}

export default logData;
