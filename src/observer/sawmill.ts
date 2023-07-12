import { Request, Response, NextFunction } from 'express';

const sawmillSitter = () => {
    return function processRequest (req: Request, res: Response, next: NextFunction) {
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

export { sawmillSitter };
