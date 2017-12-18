const User = require('../models/user');
const HTTPRequestParamError = require('../errors/http_request_param_error');
const JWT = require('jsonwebtoken');
const JWTConfig = require('../config/JWTConfig');

module.exports.getAllUsers = async function () {
    const users = User.getUserList();
    return users;
}
module.exports.addNewUser = async function (user) {
    if(!user||!user.name||!user.username||!user.password){
        throw new HTTPRequestParamError(
            'username or name or password',
            '用户名或密码为空~好好检查下吧'
        );
    }

    const created = await User.creatUser(user);
    const token = JWT.sign({
        _id: created._id.toString(),
        expireAt: Date.now().valueOf() + JWTConfig.expireIn
    },JWTConfig.SECRET);

    return {
        user: created,
        token
    }
}
module.exports.loginWithNamePassword = async function (username, password) {
    if(!username||!password){
        throw new HTTPRequestParamError(
            'username or password',
            '用户名或密码为空~好好检查下吧'
        )
    }
    const found = await User.getUserByNamepassWord(username, password);
    const token = JWT.sign({
        _id: found._id.toString(),
        expireAt: Date.now().valueOf() + JWTConfig.expireIn
    },JWTConfig.SECRET);

    return {
        user: found,
        token
    }
}
module.exports.getUserById = async function (id) {
    const user = await User.getOneUserById(id);
    return user;
}
module.exports.getUserByusername = async function (username) {
    const user = await User.getOneuserByUsername(username);
    return user;
}