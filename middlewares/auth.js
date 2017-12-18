const NoAuthError = require('../errors/no_auth_error');
const JWT = require('jsonwebtoken');
const JwTConfig = require('../config/JWTConfig');

function handler(options) {
    return function (req, res, next) {
        (async() => {
            console.log(req.body);
            const { authorization } = req.body;
            if(!authorization||authorization.indexOf('Bearer') === -1){
                throw new NoAuthError(null);
            }
            const token = authorization.split(' ')[1];
            if(!token){
                throw new NoAuthError(null);
            }
            let user;
            try {
                user = JWT.verify(token, JwTConfig.SECRET);
            } catch (error) {
                logger.error(`error user token: ${ token }`, { error })
            }
            req.user = user;
        })().then((r) => {
            next();
        }).catch((e)=>{
            next(e);
        })
    }
}

module.exports = handler;