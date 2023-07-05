function sawmillExpress(config = {}) {
    const { precision = 'milliseconds' } = config;
    return function (req, res, next) {
      const startTime = Date.now();
      res.on('finish', function () {
        const endTime = Date.now();
        let duration;
  
        switch(precision) {
          case 'seconds':
            duration = ((endTime - startTime) / 1000).toFixed(2);
            break;
          case 'milliseconds':
          default:
            duration = (endTime - startTime).toFixed(0);
            break;
        }
  
        console.log(`[${req.method} ${req.path}] Request processed in ${duration} ${precision}`);
      });
      next();
    };
  }
  
  module.exports = sawmillExpress;
  