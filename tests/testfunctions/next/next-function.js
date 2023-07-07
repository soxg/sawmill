import { sawmillNext } from "../../../src/next"

async function nextHandler(req, res){
try {
   const data = await fetch('https://statsapi.mlb.com/api/v1/stats?stats=Season&group=hitting&season=2022&limit=100&sortStat=slg&hydrate&metrics&fields').json();
   let result = 1;
   for (let i = 0; i < data.stats.splits.stat.length; i++) {
    result = result * i
   }
    return data
}catch(error) {
    console.log(error)
}
}  
export default sawmillNext(nextHandler, {precision: 'milliseconds', method: 'both', version: 'v1'});