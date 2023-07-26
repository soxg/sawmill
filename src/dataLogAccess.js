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
    console.log('FUNCTIONNAME', functionName)
    const logFilePath = pathModule.join(path, `${functionName}-log-${dur}.json`)
    
    if (!fs.existsSync(logFilePath)) {
        console.error('Sawmill: Issue accessing data because that path does not exist')
    }

    let logArray = []
    let rawDurationData = []
    let sumDurationData = 0;

    if (fs.existsSync(logFilePath)) {
        const data = fs.readFileSync(logFilePath, 'utf-8');
        logArray = data ? JSON.parse(data) : [];

        if (dur === 'ms') {
            for (let i = 0; i < logArray.length; i++) {
                rawDurationData.push(logArray[i].duration)
                console.log(logArray[i].duration)
                sumDurationData += logArray[i].duration
            }
        } else {

        }
    }
    let result;
    console.log(sumDurationData, 'AH')
    switch(dataMethod){
        case "average":
            return rawDurationData.length ? sumDurationData / rawDurationData.length : 0
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