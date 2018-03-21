const logger = require('../utils/loggers/logger');

const Unexpected_Eorror_Code = 2504;

function handler(options) {
    return function (err,req,res) {
        res.statusCode = 500;
        const errinfo= {
            url: req.originalUrl,
            err
        }
        logger.error('have an unexpected error', errinfo);
        res.json({
            msg: 'have an unexpected error',
            code: Unexpected_Eorror_Code
        })
    }
}
module.exports = handler;