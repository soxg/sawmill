const sawmillSitter = () => {
    return function processRequest (req, res, next) {
        const startTime = Date.now();
        res.on('finish', function() {
            const endTime = Date.now()
            const duration = (endTime - startTime) / 1000;
            console.log('Sawmill OBSERVER:', duration, 's');
            // console.log('Route:', req.route ? req.route.path : 'Unknown route');
        });
        next();
    }
}


module.exports = { sawmillSitter };
