const HTTPBaseError = require('./http_base_error');

const User_Not_Exist_Error_Code = 2504;

class UserNotExistError extends HTTPBaseError{
    constructor (id, username){
        super(404, '用户不存在啊~',User_Not_Exist_Error_Code,`${id},${username} is does not exist`);
    }
}

module.exports = UserNotExistError;