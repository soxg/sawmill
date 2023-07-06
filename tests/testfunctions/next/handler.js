import { sawmillNext } from "../../../src/next"

async function handler(req, res){
try {
   const data = await setTimeout(()=> {
        console.log('Handler Test');
    }, 990)
    return data
}catch(error) {
    console.log(error)
}
}  
export default sawmillNext(handler, {precision: 'seconds', method: 'both'});