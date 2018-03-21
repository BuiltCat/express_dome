const HTTPBaseError = require('./http_base_error');

const No_Auth_Error_Code = 2505;
class NoAuthError extends HTTPBaseError{
    constructor(token){
        super(401, '你没有权限啊QAQ~', No_Auth_Error_Code, `no auth token is ${token}`);
    }
}
module.exports = NoAuthError;