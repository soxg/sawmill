const fs = require('fs')
const pathModule = require('path')

function accessData(functionName, dataMethod, precision, path) {
    path = path || 'sawmill-logs'
    let dur;
    if (precision === 'milliseconds') {
        dur = 'ms'
    } else if (precision === 'seconds') {
        dur = 's'
    } else {
        dur = 'ms'
    }
    const logFilePath = pathModule.join(path, `${functionName}-log-${dur}.json`)
    
    if (!fs.existsSync(logFilePath)) {
        console.error('Sawmill: Issue accessing data because that path does not exist')
    }

    let logArray = []

    if (fs.existsSync(logFilePath)) {
        const data = fs.readFileSync(logFilePath, 'utf-8');
        logArray = data ? JSON.parse(data) : [];

        if (dur === 'ms') {

        } else {
            
        }
    }
    let result;
    console.log('DM', dataMethod)
    switch(dataMethod){
        case "average":
            console.log(logArray, logFilePath)
            let sum = logArray.reduce((a, b)=> a + b.duration, 0)
            console.log('SUM', sum);
            result = logArray.length ? Number((sum / logArray.length).toFixed(2)): 0
        case 'median':
            break;
        case 'min':
            break;
        case 'max':
            break;
        case 'sum':
            break;
        case 'count':
            break;
        case 'stdDev':
            break;
        case 'variance':
            break;
        case 'length':
            break;
        case 'clear':
            break;
    }
    return result
}

module.exports = accessData