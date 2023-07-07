const http = require('http');
const https = require('https');

function sawmillServerWrapper() {
  intercept(http);
  intercept(https);
}

function intercept(module) {
  let original = module.request;
  let endTime;

  function sawmillWrapper(outgoing) {
    let req = original.apply(this, arguments);
    const startTime = Date.now();
    console.log('startTime', startTime)
    let emit = req.emit;
    let body = "";
    
    
    req.emit = function (eventName, response) {
    
      switch (eventName) {
        case "response": {
          response.on("end", () => {
            endTime = Date.now();
            console.log('endTime', endTime)
            let res = {
              statusCode: response.statusCode,
              headers: response.headers,
              message: response.statusMessage,
              body,
            };
            
          });
          break; 
        }
      }
      console.log(`Sawmill: ${((endTime - startTime) / 1000).toFixed(2)} seconds`);
      return emit.apply(this, arguments);
    }
    // sawmillWrapper(outgoing)
    return req;
  }

  // function logParams(req) { // Remove this function if not used
  //   let log = {
  //     method: req.method || "GET",
  //     host: req.host || req.hostname || "localhost",
  //     port: req.port || "3000",
  //     path: req.pathname || req.path || "/",
  //     headers: req.headers || {}
  //   }
  //   console.log(log);
  // }

  module.request = sawmillWrapper;
}

module.exports = { sawmillServerWrapper };
