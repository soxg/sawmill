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
    let rawDurationData = []
    let sumDurationData = 0;

    if (fs.existsSync(logFilePath)) {
        const data = fs.readFileSync(logFilePath, 'utf-8');
        logArray = data ? JSON.parse(data) : [];

        if (dur === 'ms') {
            for (let i = 0; i < logArray.length; i++) {
                rawDurationData.push(logArray[i].duration)
                sumDurationData += logArray[i].duration
            }
        } else {

        }
    }
    // function drawLineGraph(rawDurationData) {
    //     const maxValue = Math.max(...rawDurationData);
    //     const height = 10; // Height of the graph (adjust as needed)
      
    //     function getLine(y) {
    //       const threshold = (maxValue / height) * y;
    //       return rawDurationData.map(value => (value >= threshold ? '█' : ' ')).join('');
    //     }
      
    //     // Calculate the number of entries for the x-axis label
    //     const numEntries = rawDurationData.length;
      
    //     // Calculate the values for the y-axis labels (bottom, middle, top)
    //     const bottomValue = 0;
    //     const middleValue = Math.round(maxValue / 2);
    //     const topValue = maxValue;
      
    //     const maxLabelLength = Math.max(
    //       numEntries.toString().length,
    //       topValue.toString().length,
    //       middleValue.toString().length,
    //       bottomValue.toString().length
    //     );
    //     const paddingX = Math.floor((50 - numEntries) / 2);
      
    //     console.log(`Entries: ${' '.repeat(paddingX)}${numEntries.toString().padEnd(50 - paddingX)}`);
    //     console.log(`${' '.repeat(paddingX)} ${topValue.toString().padStart(maxLabelLength)} ┤`);
    //     for (let y = height; y >= 0; y--) {
    //       console.log(`${getLine(y)} ${' '.repeat(paddingX - 1)}${y === height ? '─' : ' '}`);
    //     }
    //     console.log(`${' '.repeat(paddingX)} ${middleValue.toString().padStart(maxLabelLength)} ┤`);
    //     console.log(`${' '.repeat(paddingX)} ${bottomValue.toString().padStart(maxLabelLength)} ┼${'─'.repeat(numEntries)}`);
    //   }
    //   drawLineGraph(rawDurationData);

    let result;
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
        case 'graph':
            break;
    }
    return result
}

module.exports = accessData;