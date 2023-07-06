const fs = require('fs')
const pathModule = require('path')

function logData(functionName, logEntry, path = '') {
    path = path || 'sawmill-logs';
    const logFilePath = pathModule.join(path, `${functionName}-log.json`);

    if (!fs.existsSync(path)) {
        try {
            fs.mkdirSync(path);
        } catch(e) {
            console.error('Sawmill: Issue creating path from config object. Error: ',e)
        }
    }

    let logArray = [];
    if (fs.existsSync(logFilePath)) {
        const existingData = fs.readFileSync(logFilePath, 'utf8');
        logArray = existingData ? JSON.parse(existingData) : [];
    }
    
    logArray.push(logEntry);

    fs.writeFileSync(logFilePath, JSON.stringify(logArray, null, 2), 'utf8', (error) => {
        if (error) {
            console.error(`Sawmill: Error writing to log file for ${functionName} at ${logFilePath}:`, error);
        }
    });
}

module.exports = logData;
