const HTTPBaseError = require('./http_base_error');

const HTTP_Requesr_Param_Error_Code = 2501;

class HTTPRequesrParamError extends HTTPBaseError{
    constructor(paramName, desc){
        super(200, desc, HTTP_Requesr_Param_Error_Code,`${paramName} wrong ${desc}`);
    }
}

module.exports = HTTPRequesrParamError;