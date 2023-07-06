const fs = require('fs')

function logData(functionName, logEntry) {
    const logFileName = `${functionName}-log.json`
    
    const existingFile = fs.existsSync(logFileName)

    if (!existingFile) {
        fs.writeFileSync(logFileName, '');
    }

    fs.appendFile(logFileName, JSON.stringify(logEntry) + '\n', 'utf8', (error) => {
        if (error) {
            console.error(`Sawmill: Error writing to log file for ${functionName} at ${logFileName}:`, error);
        }
    });
    
}

module.exports = logData;