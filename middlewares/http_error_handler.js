const HTTPBaseError = require('../errors/http_base_error')
const logger = require('../utils/loggers/logger');

function handler(options) {
    return function (err, req, res, next) {
        if(err instanceof HTTPBaseError){
            logger.error(err.message,{query:req.query,url:req.originalUrl});
            res.statusCode = err.httpstatusCode;
            res.json({
                code: err.errCode,
                msg: err.httpMsg,
            });
        }else{
            next(err);
        }
    }
}

module.exports = handler;