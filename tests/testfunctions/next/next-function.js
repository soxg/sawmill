import sawmill from '../../../src/utils/sawmill'
async function nextHandler(req, res){
try {
    const data = await fetch('https://statsapi.mlb.com/api/v1/stats?stats=Season&group=hitting&season=2022&limit=100&sortStat=slg&hydrate&metrics&fields').json();
    return data
}catch(error) {
    console.log(error)
}
}  
export default sawmill(nextHandler, {mode: 'bothLogs', precision: 'milliseconds'})