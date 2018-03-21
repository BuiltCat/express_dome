const HTTPBaseError = require('./http_base_error');

const Internal_Server_Error_Code = 2502;

class InternalServerError extends HTTPBaseError{
    constructor(msg){
        super(500, '服务器错误请重试~!', Internal_Server_Error_Code, `server boom! error may form ${msg}`);
    }
}

module.exports = InternalServerError;